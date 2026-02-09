from django.db import models
from django.contrib.auth.models import User

class Let(models.Model):
    relacija = models.CharField(max_length=100)
    vreme_polaska = models.DateTimeField() 
    aviokompanija = models.CharField(max_length=100, default='Air Serbia')
    polaziste = models.ForeignKey('Aerodrom', on_delete=models.CASCADE, related_name='polaziste_letovi', null=True, blank=True)
    odrediste = models.ForeignKey('Aerodrom', on_delete=models.CASCADE, related_name='odrediste_letovi', null=True, blank=True)
    def __str__(self):
        return f"{self.relacija} - {self.aviokompanija} ({self.vreme_polaska})"



class AvioPonuda(models.Model): 
    let = models.ForeignKey(Let, on_delete=models.CASCADE, null=True, blank=True)
    cena = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    klasa = models.CharField(max_length=50, default='Ekonomska')
    def __str__(self):
        return f"{self.let.relacija} - {self.let.aviokompanija} ({self.klasa}) - {self.cena} RSD"

class Rezervacija(models.Model): 
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE)
    ponuda = models.ForeignKey(AvioPonuda, on_delete=models.CASCADE)
    datum = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Rezervacija: {self.korisnik.username} - {self.ponuda.let.relacija} ({self.ponuda.klasa}) - {self.ponuda.cena} RSD"

class PracenjeCena(models.Model): 
    korisnik = models.ForeignKey(User, on_delete=models.CASCADE) 
    let = models.ForeignKey(Let, on_delete=models.CASCADE) 
    limit_cene = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f"Praćenje cene: {self.korisnik.username} - {self.let.relacija} - limit: {self.limit_cene} RSD"


class ZakljucavanjePonude(models.Model):
    avio_ponuda = models.ForeignKey(AvioPonuda, on_delete=models.CASCADE, null=True, blank=True)
    je_zakljucano = models.BooleanField(default=False)
    datum_vreme = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        status = "DA" if self.je_zakljucano else "NE"
        return f"Zaključano: {status} - {self.avio_ponuda.let.relacija}"


class Aerodrom(models.Model): 
    naziv = models.CharField(max_length=255) 
    skracenica = models.CharField(max_length=3) 
    grad = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.naziv} ({self.skracenica})"

class ProfilKorisnika(models.Model): 
    ULOGE = ( ('admin', 'Administrator'),('radnik', 'Radnik'), ('putnik', 'Putnik'))
    telefon = models.CharField(max_length=20, blank=True, null=True)
    tip_korisnika = models.CharField(max_length=20, choices=ULOGE, default='putnik')
    uloga = models.CharField(max_length=20, choices=ULOGE, default='putnik') 

    def __str__(self): 
        return f"{self.korisnik.username} - {self.uloga}"
