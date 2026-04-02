FROM node:20-alpine

ARG DOCKER_ENV
ENV DOCKER_ENV=$DOCKER_ENV

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]