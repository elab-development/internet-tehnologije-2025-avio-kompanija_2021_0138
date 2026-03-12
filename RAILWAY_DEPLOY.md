# 🚀 Railway.app Deployment Guide

## Za 5 minuta do live aplikacije!

### Korak 1: Kreiraj Railway Account
1. Idi na https://railway.app
2. Prijavi se sa GitHub account-om
3. Autorizuj Railway da pristupi tvojim repo-zima

### Korak 2: Deploy App
1. Klikni **"New Project"**
2. Izaberi **"Deploy from GitHub"**
3. Nađi i izaberi repo: `avio-kompanija-2021-0138`
4. Klikni **"Deploy"**

### Korak 3: Railway će automatski:
- ✅ Detektovati Django + React aplikaciju
- ✅ Build-ovati Docker images
- ✅ Kreirati PostgreSQL bazu podataka
- ✅ Podesiti environment varijable
- ✅ Dodeliti HTTPS domen: `your-app.railway.app`

### Korak 4: Konfiguriši Environment (opciono)
U Railway dashboard-u, pod "Variables":
```
DEBUG=False
SECRET_KEY=neki-random-string-ovde
DJANGO_SETTINGS_MODULE=flight_backend.settings
```

### Korak 5: Pokreni migracije
U Railway terminal-u:
```bash
python manage.py migrate
```

## 🎉 Gotovo!

Vaša aplikacija je sada live na: `https://your-app.railway.app`

## 💡 Railway Features:
- **Besplatno**: 512MB RAM, 1GB storage
- **Auto-scaling**: Automatski se skalira
- **Custom domeni**: Možete dodati svoj domen
- **SSL**: Automatski HTTPS
- **Logs**: Real-time logging
- **Database**: Built-in PostgreSQL

## 🔄 Update aplikacije:
Samo push-ujte na GitHub - Railway automatski redeploy-uje!

## 🆘 Problemi?
- Proverite Railway logs u dashboard-u
- Restartujte service ako je potrebno
- Kontaktirajte Railway support