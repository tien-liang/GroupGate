from rest_framework import viewsets
from groups import models
from .serializers import UserSerializer, GroupCreateSerializer
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = models.Group.objects.all()
    serializer_class = GroupCreateSerializer