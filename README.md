# Celeste Air

Ovaj projekat je Django aplikacija za upravljanje letovima i aerodromima.

## Kako pokrenuti aplikaciju

### 1. Baza podataka
Pre nego što pokrenete aplikaciju, proverite da li imate instaliran **MySQL** i da li ste kreirali bazu podataka:


### 2. Instalacija zavisnosti
Otvorite terminal u folderu `backend/` i pokrenite:
```bash
pip install -r requirements.txt
```

### 3. Migracije baze podataka
U istom terminalu, primenite migracije da biste kreirali tabele:
```bash
python manage.py migrate
```

### 4. Pokretanje servera
Sada možete pokrenuti razvojni server:
```bash
python manage.py runserver
```
Aplikacija će biti dostupna na: `http://127.0.0.1:8000/`

### 5. Punjenje baze podacima (Opciono)
Ako želite da povučete stvarne letove sa AviationStack API-ja, pokrenite:
```bash
python dohvati_letove.py
```

## API Krajnje tačke (Endpoints)
- `http://127.0.0.1:8000/api/letovi/` - REST API za letove
- `http://127.0.0.1:8000/api/aerodromi/` - REST API za aerodrome
- `http://127.0.0.1:8000/admin/` - Django Admin panel
