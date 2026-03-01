# Koristimo zvaničnu Python sliku
FROM python:3.10-slim

# Postavljamo radni direktorijum u kontejneru
WORKDIR /app

# Zabranjujemo Pythonu da piše .pyc fajlove i omogućavamo ispis u realnom vremenu
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instaliramo sistemske zavisnosti (ako zatreba za bazu)
RUN apt-get update && apt-get install -y netcat-traditional

# Kopiramo requirements i instaliramo biblioteke
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiramo ceo kod backenda
COPY . .

# Pokrećemo server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]