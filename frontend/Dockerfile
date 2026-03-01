# Koristimo Node.js
FROM node:18-alpine

WORKDIR /app

# Kopiramo package.json i instaliramo zavisnosti
COPY package.json .
COPY package-lock.json .
RUN npm install

# Kopiramo ostatak koda
COPY . .

# Expose port (Vite obično koristi 5173)
EXPOSE 5173

# Pokrećemo Vite sa --host da bi bio dostupan van kontejnera
CMD ["npm", "run", "dev", "--", "--host"]