# Używamy lekkiego obrazu Pythona
FROM python:3.11-alpine
WORKDIR /app

# Kopiujemy plik z wymaganymi zależnościami
COPY requirements.txt .

# Instalujemy zależności
RUN pip install --no-cache-dir -r requirements.txt

# Kopiujemy cały kod projektu do kontenera
COPY . .

# Wystawiamy port, na którym działa Django
EXPOSE 8000

# Komenda uruchomienia serwera deweloperskiego Django
# 0.0.0.0 jest konieczne, aby serwer był dostępny poza kontenerem
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]