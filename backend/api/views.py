# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import Task,Profile
from rest_framework.views import APIView
from .serializers import TaskSerializer,TaskDetailSerializer, TaskSimpleSerializer, TaskUpdateSerializer,userList, TaskCompleteSerializer

# Create your views here.

##### API Task #####

##### CREATE
class TaskCreateAPIView(generics.ListCreateAPIView):
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
class TaskListAPIView(APIView):
    def get(self, request):
        queryset= Task.objects.all()
        data= TaskSerializer(queryset,many =True).data
        return Response(data)
# ID, TITLE LIST
class TaskSimpleListAPIView(APIView):
    def get(self, request):
        queryset= Task.objects.all()
        data= TaskSimpleSerializer(queryset,many =True).data
        return Response(data)
# DETAIL
class TaskDetailAPIView(APIView):
    def get(self, request , pk):
        queryset=Task.objects.get(pk=pk)
        data= TaskDetailSerializer(queryset, many=False).data
        return Response(data)

#UPDATE
class TaskUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = TaskUpdateSerializer
    queryset = Task.objects.all()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

class TaskCompleteAPIView(generics.RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskCompleteSerializer

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = request.data.get('status', None) is not None  # Asegura que se actualice solo 'status'
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
# DELETE

class TaskDeleteAPIView(generics.DestroyAPIView):
    serializer_class=TaskDetailSerializer
    queryset=Task.objects.all()


#list view
class UserListAPIView(APIView):
    def get(self, request):
        queryset= Profile.objects.all()
        data= userList(queryset,many =True).data
        return Response(data)