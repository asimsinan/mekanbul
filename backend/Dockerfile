FROM node:20-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=3000
EXPOSE 3000
CMD ["node", "app.js"]
