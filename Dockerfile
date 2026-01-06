FROM node

ENV MONGO_DB_USERNAME=root \
    MONGO_DB_PWD=root123

RUN mkdir -p delta/nodeapp

COPY . /delta/nodeapp

CMD ["node","/delta/nodeapp/server.js"]