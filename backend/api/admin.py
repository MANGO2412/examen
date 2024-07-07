from django.contrib import admin

from api import models

# Register your models here.
@admin.register(models.Task)
class GrantGoalAdmin(admin.ModelAdmin):
      list_display = ["title","user", "description", "timestamp", "final_date", "status"]

    