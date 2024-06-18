FROM node:21.7.3-alpine

WORKDIR /app

COPY package.json ./

RUN ls -al

RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]


