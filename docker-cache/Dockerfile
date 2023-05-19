
FROM node:18-alpine

WORKDIR /dashboard
COPY . . 

RUN yarn  &&\
    yarn cache clean &&\ 
    echo "Build dashboard cache success...!"

