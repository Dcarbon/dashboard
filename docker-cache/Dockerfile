
FROM node:18-alpine

WORKDIR /dashboard
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile &&\
    yarn cache clean &&\
    echo "Build dashboard cache success...!"

