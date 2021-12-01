FROM node:16.13-alpine AS packages
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY packages packages
RUN find packages \! -name package.json -mindepth 2 -maxdepth 2 -exec rm -rf {} +

FROM node:16.13-alpine AS deps
WORKDIR /app
RUN apk add --no-cache alpine-sdk libc6-compat python3
COPY --from=packages /app .
RUN yarn install --immutable

FROM deps AS builder
WORKDIR /app
COPY . .
RUN yarn build

FROM node:16.13-alpine
WORKDIR /app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S gatsby -u 1001

COPY --from=deps /app .
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/public public
COPY --from=builder --chown=gatsby:nodejs /app/dist dist
COPY --from=builder --chown=gatsby:nodejs /app/.next .next

USER gatsby
EXPOSE 3000

CMD ["node", "."]
