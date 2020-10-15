FROM ubuntu:20.04


# C++ Build tools

RUN apt-get update && \
	apt-get install -y build-essential 


# C++ App

RUN mkdir -p /app/

WORKDIR /app/

COPY src ./

RUN g++ -o dummy-app main.cpp

# Node Setup

ENV NODE_VERSION=12.6.0

RUN apt update && apt install -y curl

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash

ENV NVM_DIR=/root/.nvm

RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}

RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}

ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN npm install -g typescript

# Node App

RUN mkdir -p /app/wrapper

WORKDIR /app/wrapper

COPY wrapper/package*.json ./

RUN npm install 

COPY wrapper .

RUN npm run build

EXPOSE 3000

ENV BINARY_PATH=/app/dummy-app

CMD [ "npm", "start" ]
