from rest_framework import serializers
from groups import models


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'description',
        )
        model = models.Group