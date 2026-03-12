"""
URL configuration for flight_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework.routers import DefaultRouter
from core.views import lista_letova, LetViewSet, AerodromViewSet, AvioPonudaViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import RegisterView

def health_check(request):
    return JsonResponse({'status': 'healthy'})
# 1. Podešavanje rutera za ViewSet-ove (automatski API)
router = DefaultRouter()
router.register(r'letovi', LetViewSet)
router.register(r'aerodromi', AerodromViewSet)
router.register(r'ponude', AvioPonudaViewSet)

# 2. Jedinstvena lista putanja
urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Health check endpoint
    path('api/health/', health_check, name='health_check'),
    
    # Sve rute iz rutera će sada biti dostupne na http://127.0.0.1:8000/api/...
    path('api/', include(router.urls)),
    
    # Posebna funkcija 
    path('api/lista-stara/', lista_letova),
      #  postojeće rute 
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='auth_register'),
]

