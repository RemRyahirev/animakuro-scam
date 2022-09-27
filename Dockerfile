FROM node:16-alpine AS builder
WORKDIR /build
COPY . ./
RUN npm install -g pnpm@7.11.0 && \
    pnpm install && \
    pnpm generate && \
    pnpm build

FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i -g pnpm@7.11.0
COPY --from=builder /build/node_modules node_modules/
COPY --from=builder /build/dist dist/
EXPOSE 8080
CMD ["pnpm", "start"]