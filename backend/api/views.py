from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Project, ProjectNode, Node, NodeGroupChild, NodeGroup
from .serializers import ProjectBasicSerializer, ProjectDetailSerializer, ProjectNodeSerializer, NodeSerializer, NodeGroupChildSerializer, ReparentSerializer
from rest_framework.permissions import IsAuthenticated


def result_project_nodes(project):
    nodes = project.projectnode_set.all().order_by('order')
    result = ProjectNodeSerializer(nodes, many=True).data
    return Response(result)

def result_group_nodes(node):
    children = node.node_group_parent.all().order_by('order')
    result = NodeGroupChildSerializer(children, many=True).data
    return Response(result)

def fix_project_order(project):
    nodes = project.projectnode_set.all().order_by('order')
    idx = 0
    for n in nodes:
        n.order = idx
        n.save()
        idx += 1

def fix_group_order(node):
    children = node.node_group_parent.all().order_by('order')
    idx = 0
    for c in children:
        c.order = idx
        c.save()
        idx += 1

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
        })

class ProjectsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.filter(owner=request.user)
        serializer = ProjectBasicSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectBasicSerializer(data=request.data)

        if serializer.is_valid():
            serializer.validated_data['owner_id'] = request.user.id

            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class ProjectsDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found", status=404)

        serializer = ProjectDetailSerializer(project)
        result = serializer.data

        nodes = project.projectnode_set.all()
        result["nodes"] = ProjectNodeSerializer(nodes, many=True).data

        return Response(result)

    def delete(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found", status=404)

        project.delete()

        return Response("OK", status=200)

class NodesListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found", status=404)

        nodes = project.projectnode_set.all()
        result = ProjectNodeSerializer(nodes, many=True).data
        return Response(result)

    def post(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found", status=404)

        serializer = NodeSerializer().get_serializer(request.data)
        serializer.is_valid(raise_exception=True)
        new_node = serializer.save()
        nodes = project.projectnode_set.all()

        last_order=-1
        for node in nodes:
            if node.order > last_order:
                last_order = node.order

        ProjectNode(project=project, node=new_node, order=last_order+1).save()

        return Response(NodeSerializer(new_node).data)


class NodeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, node_pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found project", status=404)

        try:
            node = Node.objects.get(id=node_pk)
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        return Response(NodeSerializer(node).data)

    def delete(self, request, pk=None, node_pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found project", status=404)

        try:
            node = Node.objects.get(id=node_pk)
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        node.delete()

        return Response("OK", status=200)

    def post(self, request, pk=None, node_pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found project", status=404)

        try:
            node = Node.objects.get(id=node_pk)
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        if node.get_node_type() != 'node-group':
            return Response("Only can add children to nodegroups", status=400)

        serializer = NodeSerializer().get_serializer(request.data)
        serializer.is_valid(raise_exception=True)
        new_node = serializer.save()

        node = node.as_child()
        children = node.node_group_parent.all()
        last_order=-1
        for child in children:
            if child.order > last_order:
                last_order = node.order

        NodeGroupChild(group=node, child=new_node, order=last_order+1).save()

        return result_group_nodes(node)

    def put(self, request, pk=None, node_pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found project", status=404)

        try:
            node = Node.objects.get(id=node_pk)
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        serializer = NodeSerializer().get_updater(node, request.data)
        serializer.is_valid(raise_exception=True)
        result = serializer.save()

        return Response(NodeSerializer(result).data)

class ProjectSetChildView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None, node_pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found project", status=404)

        serializer = ReparentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            move_node = Node.objects.get(id=serializer.data['node'])
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        # Delete from the old location and redo the order
        for pn in ProjectNode.objects.filter(node=move_node):
            pn.delete()
            fix_project_order(pn.project)

        for ngc in NodeGroupChild.objects.filter(child=move_node):
            ngc.delete()
            fix_group_order(ngc.group)

        # Set the order space
        nodes = project.projectnode_set.all()
        for node in nodes:
            if node.order >= serializer.data['order']:
                node.order += 1
                node.save()

        ProjectNode(project=project, node=move_node, order=serializer.data['order']).save()

        fix_project_order(project)

        return result_project_nodes(project)

class NodeSetChildView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk=None, node_pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found project", status=404)

        try:
            node = Node.objects.get(id=node_pk).as_child()
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        serializer = ReparentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            move_node = Node.objects.get(id=serializer.data['node'])
        except Node.DoesNotExist:
            return Response("Not found node", status=404)

        for pn in ProjectNode.objects.filter(node=move_node):
            pn.delete()
            fix_project_order(pn.project)

        for ngc in NodeGroupChild.objects.filter(child=move_node):
            ngc.delete()
            fix_group_order(ngc.group)

        # Set the order space
        children = node.node_group_parent.all()
        for child in children:
            print(child)
            if child.order >= serializer.data['order']:
                print(child.order)
                child.order += 1
                print(child.order)
                child.save()

        NodeGroupChild(group=node, child=move_node, order=serializer.data['order']).save()
        fix_group_order(node)

        return result_group_nodes(node)
