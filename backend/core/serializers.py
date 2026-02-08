from rest_framework import serializers 
from .models import Let, Aerodrom

class AerodromSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Aerodrom 
        fields = 'all'

class LetSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Let 
        fields = 'all'