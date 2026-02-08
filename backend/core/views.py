from django.shortcuts import render 
from .models import Let, Aerodrom
from rest_framework import viewsets 
from .serializers import LetSerializer, AerodromSerializer


def lista_letova(request): 
    svi_letovi = Let.objects.all() 
    return render(request, 'core/lista_letova.html', {'letovi': svi_letovi})



class LetViewSet(viewsets.ModelViewSet): 
    queryset = Let.objects.all() 
    serializer_class = LetSerializer

class AerodromViewSet(viewsets.ModelViewSet): 
    queryset = Aerodrom.objects.all()
    serializer_class = AerodromSerializer 