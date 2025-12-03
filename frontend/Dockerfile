# --- ETAP 1: BUILDER (Budowanie aplikacji) ---
FROM node:20-alpine AS builder

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie tylko plików definicji zależności (pakiet.json i lockfile)
# Jest to kluczowe dla wykorzystania cache Dockera (zostanie to wykonane tylko,
# gdy te pliki się zmienią)
COPY package.json ./
COPY package-lock.json ./

# Instalacja zależności
# Jeśli masz problem z ENOENT, upewnij się, że package.json jest skopiowany poprawnie.
RUN npm install

# Kopiowanie reszty kodu źródłowego
COPY . .

# Budowanie aplikacji (np. dla React/Vue/Angular)
# Zastąp 'npm run build' właściwym poleceniem budowania dla Twojego projektu
RUN npm run build

# --- ETAP 2: PRODUCTION (Lekki serwer plików statycznych) ---
# Używamy lekkiego obrazu Nginx do serwowania zbudowanych plików
FROM nginx:alpine AS production

# Kopiowanie zbudowanych plików z etapu 'builder' do katalogu serwowania Nginx
# Upewnij się, że '/app/dist' jest poprawną ścieżką wyjściową budowania (może to być też /app/build, /app/out itp.)
COPY --from=builder /app/dist /usr/share/nginx/html

# Kopiowanie niestandardowej konfiguracji Nginx dla obsługi React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Domyślny port Nginx to 80, który wystawiamy.
EXPOSE 3002

# Uruchomienie Nginx
CMD ["nginx", "-g", "daemon off;"]