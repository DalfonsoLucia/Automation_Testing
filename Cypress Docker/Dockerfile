FROM cypress/base:18.12.0

WORKDIR /app

COPY package.json /app/package.json

RUN npm install 

COPY . /app

RUN ./node_modules/.bin/cypress verify

CMD ["npm", "run", "cypress:e2e"]