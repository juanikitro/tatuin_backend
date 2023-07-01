FROM node:18.16.0-bullseye

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV env=production

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
