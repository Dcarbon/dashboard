
FROM dcarbon/dashboard:cache

COPY . . 

RUN yarn && yarn build &&\
    rm -rf src &&\
    yarn cache clean &&\ 
    echo "Build dashboard success...!"

CMD [ "yarn", "start" ]