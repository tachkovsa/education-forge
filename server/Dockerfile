FROM node:18 AS server

FROM server AS dev
WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENVIRONMENT=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]
