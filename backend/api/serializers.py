from rest_framework  import serializers
from api.models import Task

class TaskSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=[
            "id",
            "title", 
            ]

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=[
            "id",
            "title", 
            "description",
            "user",
            "final_date",
            "status"          
        ]

class TaskDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields="__all__"
