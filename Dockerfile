FROM node:12.22.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn add glob rimraf

RUN yarn install

COPY . .

RUN yarn build

FROM node:12.22.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/src/main"]