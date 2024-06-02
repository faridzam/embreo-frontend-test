FROM node:22-alpine

WORKDIR /app

ENV VITE_BASE_URL=http://localhost:3002
ENV VITE_API_BASE_URL=https://embreo-backend-test.faridzam.com

COPY package*.json ./

RUN npm cache clean --force
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD [ "npm", "run", "preview" ]