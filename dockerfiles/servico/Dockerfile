FROM node:18-alpine

RUN apk add --no-cache libc6-compat
RUN npm --version

RUN addgroup --system --gid 1001 treeco
RUN adduser --system --uid 1001 treeco

WORKDIR /app
RUN mkdir /imagens

RUN chown -R treeco:treeco /app
RUN chown -R treeco:treeco /imagens

