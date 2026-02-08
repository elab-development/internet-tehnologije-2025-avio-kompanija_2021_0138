import os 
import django 
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flight_backend.settings')
django.setup()

from core.models import Let

MOJ_KLJUC = '881f9252ba3b4b409939bb5420d202c8'
URL = 'http://api.aviationstack.com/v1/flights'

def popuni_bazu(): 
    parametri = { 'access_key': MOJ_KLJUC, 'dep_iata': 'BEG' } 
    print("Povezujem se na AviationStack...") 
    try: 
        odgovor = requests.get(URL, params=parametri) 
        podaci = odgovor.json() 
        if 'data' in podaci: 
            for let_info in podaci['data']: 
                broj = let_info['flight']['iata'] 
                odrediste = let_info['arrival']['airport'] 
                if broj and odrediste: 
                    Let.objects.get_or_create(relacija=f"Beograd - {odrediste}")
                    print("Baza je uspešno napunjena!") 
                else: print("Greška sa ključem.") 
    except Exception as e: 
                print(f"Greska: {e}")

if __name__ == "__main__": 
    popuni_bazu()
