FROM node:22-slim

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start-watch"]