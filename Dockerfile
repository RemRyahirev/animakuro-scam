FROM node:16-alpine AS builder
WORKDIR /build
RUN corepack enable pnpm
RUN apk add --no-cache patch
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . ./
RUN patch src/database/schema.prisma < src/database/mongo.patch
RUN pnpm i --offline --frozen-lockfile
RUN pnpm generate && pnpm build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN corepack enable pnpm
COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/dist dist/
EXPOSE 8080
CMD ["pnpm", "start"]
