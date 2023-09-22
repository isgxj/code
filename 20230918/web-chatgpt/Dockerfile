FROM alpine AS base

RUN apk add --no-cache nodejs=18.17.1-r0

FROM base AS builder

RUN apk add --no-cache npm=9.6.6-r0 && npm install -g yarn

WORKDIR /app

COPY . .

RUN yarn config set registry 'https://registry.npmmirror.com/'\
  && yarn install\
  && yarn build

FROM base AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]