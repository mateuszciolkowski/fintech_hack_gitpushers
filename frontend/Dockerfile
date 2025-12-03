# Używamy Node.js
FROM node:20-alpine

# Ustawienie katalogu roboczego
WORKDIR /app

# Kopiowanie plików package
COPY package.json ./
COPY package-lock.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie całego kodu
COPY . .

# Budowanie aplikacji
RUN npm run build

# Instalacja serve do serwowania statycznych plików
RUN npm install -g serve

# Expose port
EXPOSE 3002

# Uruchomienie serwera na porcie 3002
CMD ["serve", "-s", "dist", "-l", "3002"]