
FROM harbor.viet-tin.com/dcarbon/dashboard:cache_1

COPY . . 

RUN yarn && yarn build &&\
    rm -rf src &&\
    yarn cache clean &&\ 
    echo "Build dashboard success...!"

CMD [ "yarn", "start" ]