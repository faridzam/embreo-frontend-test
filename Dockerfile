FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD [ "npm", "run", "preview" ]