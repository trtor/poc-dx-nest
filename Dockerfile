# First Stage
FROM node:16 AS builder

ARG PROXY
ENV HTTP_PROXY=$PROXY \
  HTTPS_PROXY=$PROXY \
  http_proxy=$PROXY \
  https_proxy=$PROXY

RUN yarn config set proxy ${PROXY} && \
  yarn config set https-proxy ${PROXY}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build
RUN yarn migration:run

# Second Stage
FROM node:16-alpine
ENV NODE_ENV=production

RUN yarn config set proxy ${PROXY} && \
  yarn config set https-proxy ${PROXY}

WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY --from=builder /usr/src/app/ /usr/src/app/

EXPOSE 5000

ENTRYPOINT [ "node", "dist/index.js" ]
