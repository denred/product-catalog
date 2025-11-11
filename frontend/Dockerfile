FROM node:22-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci


COPY . .
RUN npm run build


FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production


USER root


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./


RUN ls -l node_modules/.bin | grep next || echo "❌ Next not found in build!"

EXPOSE 3000
CMD ["npm", "run", "start"]
