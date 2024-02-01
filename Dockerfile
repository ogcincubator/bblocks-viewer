FROM node:lts-alpine AS builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . .
RUN apk add git && yarn install && yarn build

FROM nginx:alpine as prod

ENV REGISTER_FILE ""

WORKDIR /

RUN apk add jq

COPY docker-nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ /app
COPY docker-entrypoint.sh /

EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]