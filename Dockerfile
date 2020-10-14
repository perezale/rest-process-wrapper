FROM ubuntu:20.04


# C++ Build tools

RUN apt-get update && \
	apt-get install -y build-essential 
# git cmake autoconf libtool pkg-config


# C++ App

RUN mkdir -p /opt/HelloWorld

WORKDIR /HelloWorld

COPY helloworld.cpp /HelloWorld

RUN g++ -o HelloWorld helloworld.cpp

# Node Setup

ENV NODE_VERSION=12.6.0

RUN apt update && apt install -y curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"



# Node App

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

#RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
