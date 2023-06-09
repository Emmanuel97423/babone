# syntax=docker/dockerfile:1
FROM node:16-alpine
WORKDIR /srv/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]