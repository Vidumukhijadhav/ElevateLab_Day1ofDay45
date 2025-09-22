FROM node:18


WORKDIR /nodejs-demo-app


COPY package*.json ./


RUN npm install

COPY . .


EXPOSE 3000


CMD ["npm", "start"]
