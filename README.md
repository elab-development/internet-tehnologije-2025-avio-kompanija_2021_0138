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

## CI/CD Pipeline

Projekat koristi **GitHub Actions** za automatizovanu integraciju i isporuku (CI/CD). Pipeline se pokreće na svaki push i pull request na `main` i `develop` granama.

### Workflow faze:

#### 1. Test faza
- Pokreće se na svaki push/PR
- Testira backend (Django tests) i frontend (Vitest)
- Proverava linting (ESLint)
- Koristi Docker Compose za izolovanu testiranje

#### 2. Build faza
- Pokreće se samo na push na `main` granu
- Gradi Docker image-e za backend i frontend
- Push-uje image-e na GitHub Container Registry (ghcr.io)
- Koristi Docker layer caching za brže build-ove

#### 3. Deploy faza
- Pokreće se samo na push na `main` granu
- Pripremljena za deployment na cloud platforme
- Trenutno sadrži placeholder za deployment komande

### Lokalni development

```bash
# Development sa Docker Compose
docker-compose up --build

# Production build
docker-compose -f docker-compose.prod.yml up --build
```

### Deployment

Za produkcioni deployment:

1. Kopirajte `.env.example` u `.env` i popunite vrednosti
2. Podesite SSL sertifikate u `nginx/ssl/`
3. Ažurirajte domen u `nginx/prod.conf`
4. Pokrenite: `docker-compose -f docker-compose.prod.yml up -d`

### Cloud Deployment opcije

Pipeline je pripremljen za deployment na:
- **AWS**: ECS, EKS, Elastic Beanstalk
- **Azure**: Container Instances, AKS
- **Google Cloud**: Cloud Run, GKE
- **DigitalOcean**: App Platform, Droplets
- **Heroku**: Container Registry

Za implementaciju deployment-a, dodajte odgovarajuće komande u `deploy` job-u u `.github/workflows/main.yml`.

## Pokretanje

### Development
```bash
# Backend
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

### Production Deployment

#### 🚀 **NAJLAKŠI: Railway.app (Besplatno!)**
```bash
1. Idi na https://railway.app
2. Prijavi se sa GitHub-om
3. "New Project" → "Deploy from GitHub"
4. Izaberi ovaj repo
5. Railway automatski deploy-uje sve!
```

#### 🖥️ **VPS Deployment (Jeftino)**
```bash
# Na vašem VPS-u sa Docker-om:
chmod +x deploy-to-vps.sh
./deploy-to-vps.sh
```

#### ☁️ **AWS ECS (Advanced)**
Detaljne instrukcije: **[AWS_DEPLOYMENT_README.md](AWS_DEPLOYMENT_README.md)**

#### 📄 **Sve opcije:**
Detaljne instrukcije: **[SIMPLE_DEPLOYMENT.md](SIMPLE_DEPLOYMENT.md)**

