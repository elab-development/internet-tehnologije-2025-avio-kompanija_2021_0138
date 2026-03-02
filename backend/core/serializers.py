from rest_framework import serializers 
from .models import Let, Aerodrom, AvioPonuda

class AerodromSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Aerodrom 
        fields = '__all__'

class LetSerializer(serializers.ModelSerializer):
    # Polja za čitanje (da u Swaggeru vidiš lepo objekte)
    # Ali ih ne stavljamo ovde kao primarna da ne bi blokirali upis!

    class Meta:
        model = Let
        fields = '__all__'

    def validate(self, data):
        # Uzimamo podatke direktno iz rečnika
        p = data.get('polaziste')
        o = data.get('odrediste')

        # Poređenje objekata ili ID-eva
        if p is not None and o is not None and p == o:
            raise serializers.ValidationError("Polazište i odredište ne mogu biti isti!")
        
        return data

    def validate_broj_mesta(self, value):
        if value <= 0:
            raise serializers.ValidationError("Broj mesta mora biti veći od nule!")
        return value

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



    