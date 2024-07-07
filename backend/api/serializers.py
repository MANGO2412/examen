from rest_framework  import serializers
from api.models import Task
from api.models import Profile
from django.contrib.auth.models import User

# Task Simple Serializer
class TaskSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=[
            "id",
            "title", 
            ]

# Task Serializer
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
class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        
        model=Task
        fields=[
            "id",
            "title", 
            "description",
            "final_date"       
        ]

class TaskCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        
        model=Task
        fields=[
            "status"      
        ]

class TaskDetailSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(source='user.username')  # Usa 'user.username' para obtener el nombre del usuario

    class Meta:
        model=Task
        fields="__all__"

# user
class  userList(serializers.ModelSerializer):
    user = serializers.StringRelatedField(source='user.username')  # Usa 'user.username' para obtener el nombre del usuario

    class Meta:

        model=Task
        fields="__all__"