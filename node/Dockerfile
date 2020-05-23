FROM node:alpine

WORKDIR /app
COPY package.json .
# devDepは除く
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]