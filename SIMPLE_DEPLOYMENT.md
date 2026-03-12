# Celeste Air - Simple Deployment Options

## 🎯 **Najjednostavnije opcije (besplatne):**

### 1. **Railway.app** (Preporučujem!)
```bash
# Jedan klik deployment
1. Idi na https://railway.app
2. Poveži GitHub repo
3. Railway automatski detektuje i deploy-uje
4. Besplatno: 512MB RAM, 1GB storage
```

### 2. **Render.com**
```bash
# Jednostavan setup
1. Idi na https://render.com
2. Poveži GitHub repo
3. Izaberi "Web Service" za backend
4. Izaberi "Static Site" za frontend
5. Besplatno: 750 sati/mesec
```

### 3. **Vercel + Railway**
```bash
# Frontend na Vercel, Backend na Railway
Frontend: vercel.com (besplatno)
Backend: railway.app (besplatno)
```

## 🖥️ **VPS Opcija (jeftina):**

### **DigitalOcean Droplet** ($6/mesec)
```bash
1. Kreiraj account na digitalocean.com
2. "Create Droplet" - Ubuntu 22.04, $6 plan
3. Poveži se SSH-om
4. Pokreni: ./deploy-to-vps.sh
```

### **Linode VPS** ($5/mesec)
```bash
1. Kreiraj account na linode.com
2. "Create Linode" - Ubuntu 22.04, Nanode plan
3. Poveži se SSH-om
4. Pokreni: ./deploy-to-vps.sh
```

## 🚀 **Brzi Start sa Railway:**

### Korak 1: Podesi Railway
```bash
# Idi na https://railway.app
# Prijavi se sa GitHub-om
# Klikni "New Project" → "Deploy from GitHub"
# Izaberi svoj repo: avio-kompanija-2021-0138
```

### Korak 2: Railway će automatski:
- ✅ Detektovati da je to Django + React app
- ✅ Build-ovati Docker images
- ✅ Pokrenuti bazu podataka (PostgreSQL)
- ✅ Dodeliti domen: your-app.railway.app

### Korak 3: Konfiguriši Environment
```bash
# U Railway dashboard-u, dodaj:
DEBUG=False
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://... (Railway daje automatski)
```

## 💰 **Troškovi:**

| Platforma | Cena | Limit |
|-----------|------|-------|
| **Railway** | **$0** | 512MB RAM, 1GB disk |
| **Render** | **$0** | 750 sati/mesec |
| **DigitalOcean** | **$6/mesec** | 1GB RAM, 25GB disk |
| **Linode** | **$5/mesec** | 1GB RAM, 25GB disk |

## 🎯 **Preporuka: Railway.app**

**Zašto Railway?**
- ✅ **Potpuno besplatno** za početak
- ✅ **Jedan klik deployment**
- ✅ **Automatsko skaliranje**
- ✅ **Built-in PostgreSQL baza**
- ✅ **Custom domeni** besplatno
- ✅ **SSL sertifikati** automatski

**Šta treba da uradite:**
1. Kreirajte Railway account
2. Povežite GitHub repo
3. Kliknite "Deploy"
4. Gotovo! 🎉

Vaša app će biti live za **5 minuta**!