from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Project, ProjectNode
from .serializers import ProjectBasicSerializer, ProjectDetailSerializer, ProjectNodeSerializer
from rest_framework.permissions import IsAuthenticated

class ProjectsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(request.user)
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

class NodesListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        pass


class NodeDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None, node_pk=None):
        pass
