FROM node:18 as build
WORKDIR /my-app
COPY package.json ./my-app
COPY package-lock.json /my-app
COPY . /my-app/
RUN npm install
EXPOSE 3000
CMD ["npm","start"]
#docker build -t nome-da-sua-imagem .
#docker run -p 3000:3000 -d nome-da-sua-imagem

