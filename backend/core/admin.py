from django.contrib import admin

from .models import Aerodrom, Let, AvioPonuda, ProfilKorisnika, Rezervacija, ZakljucavanjePonude, PracenjeCena

admin.site.register(Aerodrom)
admin.site.register(AvioPonuda)
admin.site.register(ProfilKorisnika)
admin.site.register(Rezervacija)
admin.site.register(ZakljucavanjePonude)
admin.site.register(PracenjeCena)

class LetAdmin(admin.ModelAdmin):
    # Koristimo tacna imena polja iz tvog models.py
    list_display = ('relacija', 'vreme_polaska', 'aviokompanija', 'polaziste', 'odrediste')
    list_filter = ('polaziste', 'odrediste', 'aviokompanija')
    search_fields = ('relacija', 'aviokompanija')

# Registrujemo Let sa ispravljenom klasom
admin.site.register(Let, LetAdmin)