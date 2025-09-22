FROM node:18


WORKDIR /nodejs-demo-app


COPY . .


RUN npm install


EXPOSE 3000


CMD ["npm", "start"]
