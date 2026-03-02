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
from rest_framework.routers import DefaultRouter
from core.views import lista_letova, LetViewSet, AerodromViewSet, AvioPonudaViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from core.views import RegisterView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from core import views  # OVA LINIJA TI NEDOSTAJE!


router = DefaultRouter()
router.register(r'letovi', LetViewSet)
router.register(r'aerodromi', AerodromViewSet)
router.register(r'ponude', AvioPonudaViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Sve rute iz rutera na http://127.0.0.1:8000/api/...
    path('api/', include(router.urls)),
    
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    
    path('api/lista-stara/', lista_letova),
    
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='auth_register'),
    path('api/konvertuj/<int:let_id>/', views.konvertuj_cenu, name='konvertuj-cenu'),
    path('api/vreme/<int:let_id>/', views.vremenska_prognoza, name='vremenska-prognoza'),
    
    ]

