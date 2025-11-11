FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

FROM base AS build
COPY . .
RUN npm run build


FROM node:22-alpine AS development
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS production
WORKDIR /app

COPY --from=build /app ./
COPY --from=base /app/node_modules ./node_modules

RUN npm prune --omit=dev

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start"]
