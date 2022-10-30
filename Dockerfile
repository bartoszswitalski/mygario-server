FROM node:18 as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn global add @nestjs/cli

RUN yarn install

COPY . .

CMD ["yarn", "start"]