FROM node:14-alpine
EXPOSE 3000
ENV NETWORK="MAINNET"
ENV BLOCKCHAIN="POLYGON"
WORKDIR /app
COPY . .
RUN yarn install
CMD ["node", "src/index.js"]
