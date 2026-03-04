CelesteAir - Avio Rezervacije & Analitika ✈️
Seminarski rad iz Internet Tehnologija koji predstavlja kompletan sistem za pretragu, analizu i vizuelizaciju avio-letova.

🚀 Tehnologije
Frontend: React (TypeScript), Tailwind CSS, Framer Motion.

Vizuelizacija: Recharts (Analiza cena po destinacijama).

Backend: Django, Django Rest Framework (Python).

Baza podataka: PostgreSQL.

DevOps: Docker, GitHub Actions (CI/CD).

✅ Realizovani Zahtevi za Visoku Ocenu
Dockerizacija: Kompletan stack (Frontend, Backend, DB) se pokreće putem docker-compose alata.

CI/CD Pipeline: Implementiran GitHub Actions workflow koji automatski pokreće testove na develop grani.

Eksterni API-ji:

Vremenska prognoza: /api/vreme/{let_id}/.

Konverzija valuta: /api/konvertuj/{let_id}/ (EUR u RSD).

Vizuelizacija: Interaktivni grafikon za poređenje cena različitih letova u realnom vremenu.

Automatizovani testovi: Napisani unit testovi za validaciju modela i API endpointa (Django TestCase).

Git Flow: Projekat koristi strukturirane grane: main, develop i feature/visualisation.

Bezbednost: Implementirana zaštita od CSRF, XSS i SQL Injection napada, uz pravilno konfigurisan CORS.

API Dokumentacija: Swagger specifikacija dostupna na /swagger/.

🛠️ Pokretanje Projekta
Potrebno je imati instaliran Docker. U korenu repozitorijuma pokrenite:

Bash
docker-compose up --build
Nakon podizanja sistema:

Sajt: http://localhost:5173

Admin Panel: http://localhost:8000/admin

Swagger API: http://localhost:8000/swagger/ 


//api/docs

