FROM node:lts as build-stage
WORKDIR /home/node/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts as production-stage
WORKDIR /home/node/app
COPY --from=build-stage /home/node/app/dist .
COPY --from=build-stage /home/node/app/node_modules ./node_modules
ENTRYPOINT ["node", "main.js"]