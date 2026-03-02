from django.shortcuts import render 
from .models import Let, Aerodrom
from rest_framework import viewsets 
from .serializers import LetSerializer, AerodromSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Registracija mora biti dostupna svima
    serializer_class = RegisterSerializer

def lista_letova(request): 
    svi_letovi = Let.objects.all() 
    return render(request, 'core/lista_letova.html', {'letovi': svi_letovi})



class LetViewSet(viewsets.ModelViewSet):
    queryset = Let.objects.all()
    serializer_class = LetSerializer
    # Ova linija dozvoljava svima da gledaju (GET), 
    # ali samo ulogovanima da menjaju podatke!
    permission_classes = [IsAuthenticatedOrReadOnly]

class AerodromViewSet(viewsets.ModelViewSet): 
    queryset = Aerodrom.objects.all()
    serializer_class = AerodromSerializer 


from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def lista_letova(request):
    letovi = Let.objects.all()
    serializer = LetSerializer(letovi, many=True)
    return Response(serializer.data)

from .models import AvioPonuda
from .serializers import AvioPonudaSerializer

class AvioPonudaViewSet(viewsets.ModelViewSet):
    queryset = AvioPonuda.objects.all()
    serializer_class = AvioPonudaSerializer



import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def konvertuj_cenu(request, let_id):
    try:
        # Pronalazimo let. Koristimo 'let_id' jer je tako u urls.py
        let = Let.objects.get(id=let_id)
        cena_eur = 150  # Test fiksna cena
        
        # Pozivamo eksterni API
        response = requests.get('https://api.exchangerate-api.com/v4/latest/EUR', timeout=5)
        
        if response.status_code == 200:
            podaci = response.json()
            kurs_rsd = podaci.get('rates', {}).get('RSD')
            
            if kurs_rsd:
                return Response({
                    "let": let.relacija,
                    "cena_eur": cena_eur,
                    "kurs": kurs_rsd,
                    "cena_rsd": round(cena_eur * kurs_rsd, 2)
                })
        
        return Response({"error": "API za kursnu listu trenutno nije dostupan"}, status=503)

    except Let.DoesNotExist:
        return Response({"error": "Let sa tim ID-em ne postoji u bazi"}, status=404)
    except Exception as e:
        return Response({"error": f"Doslo je do greske: {str(e)}"}, status=500)