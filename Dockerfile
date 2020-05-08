FROM node:14
COPY package.json /somoim/package.json
RUN cd /somoim; npm install; npm install pm2 -g
COPY . /somoim
EXPOSE 3000
WORKDIR /somoim

CMD ["pm2-runtime", "index.ts"]
