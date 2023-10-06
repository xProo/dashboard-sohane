FROM node:19

ADD resources /app

WORKDIR /app

RUN npm install

COPY docker/docker-entrypoint* /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint*

ENTRYPOINT [ "docker-entrypoint" ]

EXPOSE 3000