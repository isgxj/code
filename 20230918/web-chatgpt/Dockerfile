FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn config set registry 'https://registry.npmmirror.com/' \
  && yarn install \
  && yarn build

EXPOSE 3004

CMD ["npm", "run", "start"]