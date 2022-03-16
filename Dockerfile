FROM node:lts

WORKDIR /app

COPY package.json .

RUN npm install 
RUN mkdir feedback

COPY . . 

EXPOSE 8080

CMD [ "npm", "start" ]

