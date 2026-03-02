# ✈️ Celeste Air - Flight Management System

Sistem za upravljanje avio-saobraćajem razvijen kao projekat u okviru predmeta Internet tehnologije. Aplikacija omogućava krajnjim korisnicima pretragu letova i upravljanje rezervacijama, dok administratorima pruža uvid u resurse kompanije.

## 👥 Tim
* **Teodora Erić** - Frontend razvoj i UI/UX dizajn
* **Ognjen Obradović** - Backend razvoj i API arhitektura

## 🛠️ Implementirane tehnologije

### Frontend (Klijentska strana)
Aplikacija je realizovana kao **Single Page Application (SPA)** koristeći sledeći stek:
- **React.js (Vite)** – Za efikasno upravljanje komponentama i brzi razvoj.
- **TypeScript** – Statistička tipizacija radi osiguravanja stabilnosti koda.
- **Tailwind CSS** – Za moderan, responzivan dizajn i konzistentan vizuelni identitet.
- **React Router DOM** – Za upravljanje navigacijom i rutama unutar aplikacije.

### Backend (Serverska strana)
Serverska logika i perzistencija podataka oslanjaju se na:
- **Django REST Framework (DRF)** – Za izgradnju skalabilnog i standardizovanog API-ja.
- **Relaciona baza podataka** – Za čuvanje entiteta sistema (letovi, korisnici, rezervacije).
- **CORS Headers** – Omogućena bezbedna komunikacija između klijenta i servera.
- **drf-spectacular** – Za automatsku generaciju OpenAPI 3.0 specifikacije.

## 🐳 Dockerizacija i Pokretanje sistema

Projekat je u potpunosti dockerizovan radi lakšeg postavljanja razvojnog okruženja.

### Preduslovi
- Instaliran **Docker Desktop**

### Koraci za pokretanje
1. Klonirajte repozitorijum.
2. Pozicionirajte se u koren projekta (tamo gde je `docker-compose.yml`).
3. Pokrenite sistem komandom:
   ```bash
   docker-compose up --build

Nakon podizanja sistema, aplikacija je dostupna na sledećim adresama:

Frontend (React): http://localhost:5173

Backend Admin: http://localhost:8000/admin

Interaktivna Swagger dokumentacija: http://localhost:8000/api/docs

📑 API Specifikacija i Dokumentacija
Dokumentacija je implementirana pomoću Swagger UI alata u skladu sa OAS 3.0 standardom. Omogućava testiranje API endpoint-a direktno iz browsera, uz punu podršku za JWT autentifikaciju preko "Authorize" dugmeta.

🛡️ Bezbednost i Validacija podataka
Aplikacija ispunjava visoke kriterijume bezbednosti i integriteta podataka:

CORS zaštita: Restriktivna pravila sprečavaju neovlašćene domene da pristupaju API resursima.

JWT Autentifikacija: Pristup osetljivim operacijama (POST, PUT, DELETE) zahteva validan token.

Poslovna logika i validacija: Implementirani su "custom" validatori u serijalizatorima koji sprečavaju logički neispravne unose (npr. sistem blokira kreiranje leta gde su polazni i dolazni aerodrom identični, vraćajući 400 Bad Request status).