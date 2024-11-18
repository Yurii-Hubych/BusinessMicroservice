FROM node:18-alpine

RUN mkdir "/business"

COPY ./package.json /business

WORKDIR /business

RUN npm install