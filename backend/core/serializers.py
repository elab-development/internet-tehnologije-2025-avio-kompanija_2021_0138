from rest_framework import serializers 
from .models import Let, Aerodrom, AvioPonuda

class AerodromSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Aerodrom 
        fields = '__all__'

class LetSerializer(serializers.ModelSerializer): 
    # Ova linija kaže: "Za polje polaziste, nemoj dati samo broj, 
    # nego koristi AerodromSerializer da mi daš sve detalje"
    polaziste = AerodromSerializer(read_only=True)
    odrediste = AerodromSerializer(read_only=True)

    class Meta: 
        model = Let 
        fields = '__all__'

class AvioPonudaSerializer(serializers.ModelSerializer):
    # Ova linija povezuje ponudu sa svim detaljima leta
    let = LetSerializer(read_only=True)

    class Meta:
        model = AvioPonuda
        fields = '__all__'

from django.contrib.auth.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        # Hash-ovanje šifre je obavezno zbog bezbednosti!
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user