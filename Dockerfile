
FROM harbor.viet-tin.com/dcarbon/dashboard:cache

COPY . . 

RUN yarn build &&\
    rm -rf src &&\
    yarn cache clean &&\ 
    echo "Build dashboard success...!"

CMD [ "yarn", "start" ]