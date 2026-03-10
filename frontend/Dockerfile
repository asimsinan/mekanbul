FROM node:20-alpine

WORKDIR /frontend
COPY package*.json ./

RUN npm ci

COPY . .

ENV DOCKER=true
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
