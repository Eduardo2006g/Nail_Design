from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, ServiceViewSet, AppointmentViewSet,
    PortfolioImageViewSet, ProductViewSet, PromoCodeViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'portfolio', PortfolioImageViewSet)
router.register(r'products', ProductViewSet)
router.register(r'promocodes', PromoCodeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
