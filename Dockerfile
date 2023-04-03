# syntax=docker/dockerfile:1

FROM alpine:latest

WORKDIR /app

COPY . .

RUN apk add --no-cache  nodejs-current  && corepack enable && pnpm install && pnpm build 

EXPOSE 5000

CMD node apps/server/build/serve.js
