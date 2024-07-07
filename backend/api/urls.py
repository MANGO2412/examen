from django.urls import path
from api import views

app_name = "api"

urlpatterns = [
    path('users/list', views.UserListAPIView.as_view()),
    path('tasks/create', views.TaskCreateAPIView.as_view()),
    path('tasks/list', views.TaskListAPIView.as_view()),
    path('tasks/simple/list', views.TaskSimpleListAPIView.as_view()),
    path('tasks/detail/<int:pk>', views.TaskDetailAPIView.as_view()),
    path('tasks/update/<int:pk>', views.TaskUpdateAPIView.as_view()),
    path('tasks/complete/<int:pk>', views.TaskCompleteAPIView.as_view()),
    path('tasks/delete/<int:pk>', views.TaskDeleteAPIView.as_view()),
    path('user/list', views.UserListAPIView.as_view()),


]
