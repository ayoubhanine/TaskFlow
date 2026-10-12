FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

# Copie tout le contenu du dossier backend dans /app
COPY . .

EXPOSE 5000

CMD ["npm", "start"]