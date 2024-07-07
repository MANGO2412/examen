from django.urls import path
from api import views

app_name = "api"

urlpatterns = [
    path('tasks/create', views.TaskListCreateAPIView.as_view()),
    path('tasks/list', views.ListTaskAPIView.as_view()),
    path('tasks/simple/list', views.ListTaskSimpleAPIView.as_view()),

]
