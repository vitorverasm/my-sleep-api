FROM node:21.7.3-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npx prisma generate

CMD ["npm", "run", "dev"]
