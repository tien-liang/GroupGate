from django.urls import path
from .views import UserViewSet, GroupViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet, base_name='users')
router.register('groups', GroupViewSet, base_name='groups')

urlpatterns = [
    #  path('groups/course/<str:course>/', CourseList),
]

urlpatterns += router.urls