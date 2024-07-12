FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV NEXT_PUBLIC_BACKEND_URL=http://backend:5093

CMD ["npm", "start"]