FROM node:current-alpine3.14 as build
WORKDIR /app

COPY ./ /app/

RUN npm install
RUN npm run build