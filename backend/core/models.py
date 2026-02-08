from django.db import models
from django.contrib.auth.models import User

class Let(models.Model):
    relacija = models.CharField(max_length=100)
vreme_polaska = models.DateTimeField() 
aviokompanija = models.CharField(max_length=100, default='Air Serbia')

class AvioPonuda(models.Model): 
    let = models.ForeignKey(Let, on_delete=models.CASCADE)
cena = models.DecimalField(max_digits=10, decimal_places=2)
klasa = models.CharField(max_length=50)

class Rezervacija(models.Model): 
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE)
ponuda = models.ForeignKey(AvioPonuda, on_delete=models.CASCADE)
datum = models.DateTimeField(auto_now_add=True)

class PracenjeCena(models.Model): 
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE) 
let = models.ForeignKey(Let, on_delete=models.CASCADE) 
limit_cene = models.DecimalField(max_digits=10, decimal_places=2)

class ZakljucavanjePonude(models.Model): 
    ponuda = models.ForeignKey(AvioPonuda, on_delete=models.CASCADE)
korisnik = models.ForeignKey(User, on_delete=models.CASCADE)
vreme_isteka = models.DateTimeField()

class Aerodrom(models.Model): 
    naziv = models.CharField(max_length=255) 
    skracenica = models.CharField(max_length=3) 
    grad = models.CharField(max_length=255)

def str(self):
    return f"{self.naziv} ({self.skracenica})"

class ProfilKorisnika(models.Model): 
    ULOGE = ( ('admin', 'Administrator'),('radnik', 'Radnik'), ('putnik', 'Putnik'))
    korisnik = models.OneToOneField('auth.User', on_delete=models.CASCADE) 
    uloga = models.CharField(max_length=20, choices=ULOGE, default='putnik') 
    telefon = models.CharField(max_length=20, blank=True)

def str(self): 
    return f"{self.korisnik.username} - {self.uloga}"