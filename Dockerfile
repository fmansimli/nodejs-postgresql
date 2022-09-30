FROM node:16-alpine

WORKDIR /app/moove

RUN npm install -g pm2
RUN npm install -g yarn

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 3030

ENV PORT=3030

RUN yarn build-image

CMD ["yarn","serve:pm2"]