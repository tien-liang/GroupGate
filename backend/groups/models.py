from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    # @property
    # def full_name(self):
    #     return self.first_name + self.last_name

    # groups = models.ManyToManyField(
    #     Group, through=Group.members.through, blank=True
    # )
    groups = models.ManyToManyField('Group', through = 'Membership', blank=True)
    
    def __str__(self):
        return self.username

# class Profile(models.Model):
#     user = models.OneToOneField(CustomUser)

#     def __str__(self):
#         return self.user

class Group(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    # owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owner')
    members = models.ManyToManyField(CustomUser, blank=True, related_name='members')

    def __str__(self):
        return self.name

class Membership(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    role = models.CharField(max_length=100)