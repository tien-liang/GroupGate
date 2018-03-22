from django.urls import path
from .views import GroupViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', GroupViewSet, base_name='groups')
urlpatterns = router.urls