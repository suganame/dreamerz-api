FROM node:18-alpine
WORKDIR ./src
RUN addgroup api && adduser -S -G api api
USER api
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3001
CMD ["npm", "start"]