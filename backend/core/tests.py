from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from .models import Aerodrom, Let

class FlightValidationTest(APITestCase):

    def setUp(self):
        # Pravimo korisnika i autentifikujemo ga da prođemo JWT zaštitu
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        # Pravimo dva RAZLIČITA aerodroma
        self.aerodrom_1 = Aerodrom.objects.create(naziv="Nikola Tesla", grad="Beograd", skracenica="BEG")
        self.aerodrom_2 = Aerodrom.objects.create(naziv="Charles de Gaulle", grad="Pariz", skracenica="CDG")

    def test_create_flight_with_same_airports_fails(self):
        """Testira da li sistem blokira let ako su polazište i odredište ISTI"""
        url = reverse('let-list')
        data = {
            "relacija": "Test rupa",
            "vreme_polaska": "2026-03-02T15:00:00Z",
            "vreme_dolaska": "2026-03-02T18:00:00Z",
            "aviokompanija": "CelesteAir",
            "polaziste": self.aerodrom_1.id, 
            "odrediste": self.aerodrom_1.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_valid_flight_succeeds(self):
        """Testira da li sistem dozvoljava ispravan let"""
        url = reverse('let-list')
        data = {
            "relacija": "Beograd-Pariz",
            "vreme_polaska": "2026-03-02T15:00:00Z",
            "vreme_dolaska": "2026-03-02T18:00:00Z",
            "aviokompanija": "CelesteAir",
            "polaziste": self.aerodrom_1.id, 
            "odrediste": self.aerodrom_2.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)