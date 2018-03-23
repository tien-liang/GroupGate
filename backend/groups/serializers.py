from rest_framework import serializers
from groups import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class GroupMembershipSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='group.id')
    name = serializers.ReadOnlyField(source='group.name')
    class Meta:
        model = models.Membership
        fields = ('id', 'user', 'name',)

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    groups = GroupMembershipSerializer(source='membership_set', many=True)

    def create(self, validated_data):

        user = UserModel.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'groups')

# class GroupSerializer(serializers.ModelSerializer):
#     members = UserSerializer(many=True)
#     def create(self, validated_data):
#         members_data = validated_data['members']
#     class Meta:
#         fields = (
#             'id',
#             'name',
#             'description',
#             'members',
#         )
#         model = models.Group

class GroupCreateSerializer(serializers.ModelSerializer):
    memberships = GroupMembershipSerializer(many=True, required=False)

    def create(self, validated_data):
        user_data = validated_data.pop('memberships')
        group = models.Group.objects.create(**validated_data)
        for user in user_data:
            d=dict(user)
            models.Membership.objects.create(group=group, user=d['user'])
        return group

    def update(self, instance, validated_data):
        user_data = validated_data.pop('memberships')
        for item in validated_data:
            if models.Group._meta.get_field(item):
                setattr(instance, item, validated_data[item])
        models.Membership.objects.filter(group=instance).delete()
        for user in user_data:
            d=dict(user)
            models.Membership.objects.create(group=instance, user=d['user'])
        instance.save()
        return instance

    class Meta:
        fields = ('id', 'name', 'description', 'memberships')
        model = models.Group