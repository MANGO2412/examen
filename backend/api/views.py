# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import Task
from rest_framework.views import APIView
from .serializers import TaskSerializer,TaskDetailSerializer, TaskSimpleSerializer

# Create your views here.

##### API GRANTGOAL #####

##### CREATE
class TaskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

##### RETRIEVE


# LIST
class ListTaskAPIView(APIView):
    def get(self, request):
        queryset= Task.objects.all()
        data= TaskSerializer(queryset,many =True).data
        return Response(data)
    
class ListTaskSimpleAPIView(APIView):
    def get(self, request):
        queryset= Task.objects.all()
        data= TaskSimpleSerializer(queryset,many =True).data
        return Response(data)
# DETAIL
class DetailTaskAPIView(APIView):
    def get(self, request , pk):
        queryset=Task.objects.get(pk=pk)
        data= TaskDetailSerializer(queryset, many=False).data
        return Response(data)

#UPDATE

class UpdateTaskAPIView(generics.UpdateAPIView):
    serializer_class=TaskSerializer
    queryset=Task.objects.all()

# DELETE

class DeleteTaskAPIView(generics.DestroyAPIView):
    serializer_class=TaskDetailSerializer
    queryset=Task.objects.all()