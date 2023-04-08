FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 5000
CMD ["npm", "run", "dev"]
