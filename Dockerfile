FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

RUN yarn install --frozen-lockfile --production && yarn cache clean

FROM node:18-alpine as production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]