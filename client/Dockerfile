FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# nuxtの場合は必要
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["npm", "run", "dev"]