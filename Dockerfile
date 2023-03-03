FROM node:16-alpine AS base

WORKDIR /app

RUN addgroup -g 1001 animakuro && \
    adduser -D -S -G animakuro animakuro && \
    chown -R animakuro:animakuro /app && \
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
ARG service=api

RUN pnpm generate && \
    pnpm build $service && \
    pnpm prune --prod

####################

FROM base

ARG service=api
COPY --from=builder --chown=animakuro:animakuro /app/package.json /app/nest-cli.json ./
COPY --from=builder --chown=animakuro:animakuro /app/node_modules node_modules
COPY --from=builder --chown=animakuro:animakuro /app/dist/apps/$service dist

USER animakuro

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

EXPOSE 8080
ENTRYPOINT pnpm start:prod
