FROM node:18 AS server

FROM server AS dev
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
ENV NODE_ENVIRONMENT=development
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
