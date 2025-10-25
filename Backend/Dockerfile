FROM node:18-alpine
WORKDIR /app

# copy package files first for caching
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# ensure uploads exist
RUN mkdir -p uploads

ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "server.js"]
