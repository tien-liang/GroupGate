from django.urls import path
from .views import UserViewSet, GroupViewSet, RatingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', UserViewSet, base_name='users')
router.register('groups', GroupViewSet, base_name='groups')
router.register('ratings', RatingViewSet, base_name='ratings')

urlpatterns = [
    #  path('groups/course/<str:course>/', CourseList),
]

urlpatterns += router.urls