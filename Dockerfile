FROM node:16-alpine AS builder
WORKDIR /build
RUN corepack enable pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN pnpm i --offline --frozen-lockfile
RUN apk add --no-cache openssl openssl-dev libssl1.1 libssl3
RUN rm -rf dist/
RUN pnpm generate && pnpm build
RUN pnpm prune --prod
#RUN find node_modules \( -name "*on-engine*" -o -wholename "*/prisma/libquery*" -o -wholename "*/*prisma*engine*/*" -o -wholename "*/prisma@*/*" \) -delete

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/dist dist/
RUN corepack enable pnpm
EXPOSE 8080
CMD ["pnpm", "start"]
