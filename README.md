# Celeste Air - Flight Management System

Sistem za upravljanje avio-saobraćajem razvijen kao projekat u okviru predmeta Internet tehnologije. Aplikacija omogućava krajnjim korisnicima pretragu letova i upravljanje rezervacijama, dok administratorima pruža uvid u resurse kompanije.

## Tim
* **Teodora Erić- Frontend razvoj i UI/UX dizajn
* **Ognjen Obradović- Backend razvoj i API arhitektura

## Implementirane tehnologije

### Frontend (Klijentska strana)
Aplikacija je realizovana kao **Single Page Application (SPA)** koristeći sledeći stek:
- **React.js (Vite)** – Za efikasno upravljanje komponentama i brzi razvoj.
- **TypeScript** – Statistička tipizacija radi osiguravanja stabilnosti koda i precizne definicije modela.
- **Tailwind CSS** – Za moderan, responzivan dizajn i konzistentan vizuelni identitet (Celeste Air brending).
- **React Router DOM** – Za upravljanje navigacijom i rutama unutar aplikacije.

### Backend (Serverska strana)
Serverska logika i perzistencija podataka oslanjaju se na:
- **Django REST Framework (DRF)** – Za izgradnju skalabilnog i standardizovanog API-ja.
- **Relaciona baza podataka** – Za čuvanje entiteta sistema (letovi, korisnici, rezervacije).
- **CORS Headers** – Omogućena bezbedna komunikacija između različitih domena klijenta i servera.

## Osnovni moduli i funkcionalnosti

### 1. Dinamička pretraga i filtriranje
Implementiran je sistem za filtriranje podataka u realnom vremenu korišćenjem React `useState` kuke. Korisnici mogu pretraživati letove na osnovu:
- Destinacije (polazni i dolazni aerodromi)
- Opsega cene karte
- Datuma i vremena poletanja

### 2. Upravljanje podacima (Modeli)
Baza podataka je strukturirana kroz 5 ključnih, međusobno povezanih entiteta:
- **User** (Autentifikacija, profili i uloge korisnika)
- **Flight** (Detaljni podaci o terminima i rutama)
- **Reservation** (Relacija između korisnika i odabranog leta)
- **Destination** (Geografski podaci o aerodromima)
- **Plane** (Tehnički podaci o floti avio-kompanije)

### 3. Korisničko iskustvo (UI/UX)
- **Interaktivni modali**: Upotreba komponenti za unos podataka bez napuštanja trenutnog konteksta stranice.
- **Validacija**: Provera unosa na frontend i backend nivou radi očuvanja integriteta podataka.
