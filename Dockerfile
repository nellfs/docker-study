FROM node:lts

WORKDIR /app

COPY package.json .

RUN npm install 
RUN mkdir feedback
RUN mkdir temp

COPY . . 

EXPOSE 8080

VOLUME ["/app/temp"]

CMD [ "npm", "start" ]

