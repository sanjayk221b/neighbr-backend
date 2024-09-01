FROM node:20-alpine3.18

WORKDIR /auth

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "dev" ]
