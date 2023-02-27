FROM node:16-alpine AS base

WORKDIR /app

RUN addgroup -g 1001 appuser && \
    adduser -D -S -G appuser appuser && \
    chown -R appuser:appuser /app && \
    corepack enable pnpm

####################

FROM base as builder

RUN apk add --no-cache openssl openssl-dev libssl1.1 libssl3

USER appuser

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch && \
    pnpm i --offline --frozen-lockfile

COPY . .

ENV NODE_ENV=production
ARG SERVICE=api

RUN pnpm generate && \
    pnpm build $SERVICE && \
    pnpm prune --prod

####################

FROM base

ARG SERVICE=api
COPY --from=builder --chown=appuser:appuser /app/package.json /app/nest-cli.json ./
COPY --from=builder --chown=appuser:appuser /app/node_modules node_modules
COPY --from=builder --chown=appuser:appuser /app/dist/apps/$SERVICE dist

USER appuser

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

EXPOSE 8080
ENTRYPOINT pnpm start:prod
