FROM node:alpine AS packages
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases
COPY .yarn/plugins .yarn/plugins
COPY packages packages
RUN find packages \! -name package.json -mindepth 2 -maxdepth 2 -exec rm -rf {} +

FROM node:alpine AS deps
WORKDIR /app
RUN apk add --no-cache alpine-sdk libc6-compat python3
COPY --from=packages /app .
RUN yarn install --immutable

FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app .
RUN yarn export

FROM nginx:alpine

# Remove default site
RUN rm -rf /usr/share/nginx/html/*

# Copy over prod react nextjs build
COPY --from=builder /app/out /usr/share/nginx/html

# Handle NGINX environment variable templating with envsubst
# The entrypoint script will fill this template and copy the configuration to NGINX
COPY nginx.conf /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /usr/bin

RUN chmod +x /usr/bin/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
