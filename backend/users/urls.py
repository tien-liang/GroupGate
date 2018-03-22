from django.urls import path

from .views import UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', UserViewSet, base_name='users')
urlpatterns = router.urls