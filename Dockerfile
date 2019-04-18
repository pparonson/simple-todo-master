# specify a base image
FROM node:alpine

EXPOSE 3001

# specify working directory
WORKDIR /usr/app

# copy dependencies
COPY ./package.json ./yarn.lock ./

# install dependencies
RUN npm install -g npm
RUN npm install -g yarn

RUN yarn install

# copy project
COPY ./ ./

# default command
CMD ["yarn", "start"]
