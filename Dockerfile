FROM node:16-alpine AS builder
WORKDIR /usr/app
#COPY package*.json ./
COPY . ./
RUN npm install -g pnpm@7.11.0 && \
    pnpm install && \
    pnpm generate && \
    pnpm build

FROM node:16-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm install -g pnpm@7.11.0 &&  \
    pnpm install && \
    npx prisma generate

COPY --from=builder /usr/app/dist ./dist

EXPOSE 8080
CMD [ "pnpm", "start" ]