FROM node:22-alpine

WORKDIR /home/schoolapi_ngocle

COPY . ./

RUN npm install

# ENV PORT 3000

EXPOSE 3000

CMD ["node", "index.js"]