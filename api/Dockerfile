FROM node:22.13.1-alpine3.20

RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build && npx prisma generate

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
