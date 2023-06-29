FROM node:16-alpine 
ENV NODE_ENV development
WORKDIR /frontend
COPY package.json /frontend/package.json
RUN npm install

COPY . .

EXPOSE 4000
CMD [ "npm", "start","--host", "0.0.0.0" ]
