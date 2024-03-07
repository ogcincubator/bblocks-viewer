FROM nginx:alpine as prod

ENV REGISTER_FILE ""

WORKDIR /

RUN apk add jq && mkdir /app

COPY docker/docker-nginx.conf /etc/nginx/nginx.conf
COPY docker/docker-entrypoint.sh /
COPY docker/index.html /app/

EXPOSE 9090
ENTRYPOINT ["./docker-entrypoint.sh"]