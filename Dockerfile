FROM node:14
ARG port=3000

COPY package.json /somoim/package.json
RUN cd /somoim; npm install; npm install ts-node -g
COPY . /somoim
EXPOSE $port
WORKDIR /somoim

CMD ["ts-node", "src/index.ts"]
