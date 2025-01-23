FROM node:22.13.1-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
