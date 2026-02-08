from django.contrib import admin 
from .models import Let, AvioPonuda, Rezervacija, Aerodrom, ProfilKorisnika

admin.site.register(Let)  
admin.site.register(AvioPonuda) 
admin.site.register(Rezervacija) 
admin.site.register(Aerodrom) 
admin.site.register(ProfilKorisnika)