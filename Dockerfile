# build environment
FROM node:16-buster-slim as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

# production environment
FROM node:16-buster-slim
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist /usr/src/app/package.json /usr/src/app/yarn.lock /usr/src/app/
RUN yarn install --production=true
EXPOSE 80
ENV HTTP_PORT=80
ENV HTTP_ADDRESS=0.0.0.0
CMD ["node", "./server.js"]