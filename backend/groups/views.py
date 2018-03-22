from rest_framework import viewsets
from groups import models
from .serializers import GroupSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = models.Group.objects.all()
    serializer_class = GroupSerializer