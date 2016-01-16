templelate
================

templelate app repository

## Get the app
```bash
# Go to folder that you want to put your app directory
git clone https://git.findhit.com/brunocasanova/templelate.git
```

## Installing

```bash
# Instal modules
npm install
```

## Initiating the app

##### Database
###### mongo db

```bash
# start mongo ( daemon )
npm run init-mongo
```

##### Debugging
###### node-inspector | mongo-express-view

```bash
# start mongo ( daemon )
npm run init-mongo

# start mongo express view ( daemon )
npm run init-mongo-express

# start node-inspector ( daemon )
npm run init-node-inspector
```

##### Backend
###### express.js

```bash
# start server in production environment
npm run app

# start server in development environment
npm run dev-app
```

##### Frontend
###### webpack | semantic-ui

```bash
# build frontend with webpack in production environment
npm run build-webpack

# build frontend with semantic-ui in production environment
npm run build-semantic

# watch frontend with webpack in development environment
npm run watch-webpack

# watch frontend with semantic-ui in development environment
npm run watch-semantic
```