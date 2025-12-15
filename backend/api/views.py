from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Project, ProjectNode
from .serializers import ProjectBasicSerializer, ProjectDetailSerializer, ProjectNodeSerializer

class ProjectsListView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectBasicSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProjectBasicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ProjectsDetailView(APIView):
    def get(self, request, pk=None):
        try:
            project = Project.objects.get(id=pk)
        except Project.DoesNotExist:
            return Response("Not found", status=404)
        
        serializer = ProjectDetailSerializer(project)
        result = serializer.data

        nodes = ProjectNode.objects.filter(project=project)

        #print([n.node.as_child() for n in nodes])

        #print(project.projectnode_set.all())
        #print(ProjectNodeSerializer(project.projectnode_set.all(), many=True).data)

        result["nodes"] = ProjectNodeSerializer(project.projectnode_set.all(), many=True).data
        
        return Response(result)
