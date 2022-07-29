FROM node:14.17-alpine3.12 as build
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build
CMD ["npm", "start", "--prod"]

