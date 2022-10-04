FROM node:16-alpine AS builder
WORKDIR /build
COPY . ./
RUN apk add --no-cache patch
RUN patch prisma/schema.prisma < prisma/docker.patch
RUN corepack enable pnpm && \
    pnpm install && \
    pnpm build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN corepack enable pnpm
COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/dist dist/
EXPOSE 8080
CMD ["pnpm", "start"]
