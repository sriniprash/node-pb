# node-pb
A minimalist PasteBin server in NodeJS.

## Getting Started:

### Installation

```
git clone git@github.com:sriniprash/node-pb.git
cd node-pb
npm install
```

### Configuration

The configuration values can be tweaked in the config.js file.

Sample configuration for fileStore as backend storage:

```
let appConfig = {
  "storeDirectory": "/var/data/pastes"
};
```

Sample Configuration for redisStore as backed storage:

```
let appConfig = {
  "host": "127.0.0.1",
  "port": 6379,
  "redisPrefix": "paste_"
};
```

For redisStore, the config values confirm to: http://redis.js.org/#api-rediscreateclient

### Starting the server

```
STORE_TYPE=redisStore node app.js #This should start the server at port 3000 with redis as the backend store.

STORE_TYPE=fileStore node app.js #This should start the server at port 3000 with filesystem as the backend store.
```

If STORE_TYPE is not specified, then the app defaults to "fileStore".

## Usage:

### To create a new paste:

```
$ netstat -a | curl -X POST --data-binary @- -H "Content-Type: text/plain" "http://localhost:3000"
Paste Created with ID: 284c9fe80d97a70654cb137dd1a694e3
```

### To fetch an existing post with id:

```
curl "localhost:3000/284c9fe80d97a70654cb137dd1a694e3"
```

## Implementing other storage types:

Currently, there are 2 implementations of the AbstractStore type
- FileStore - stores the pastes in the filesystem.
- RedisStore - stores the pastes in redis as key, values.

To implement other storage types, extend the AbstractStore class and implement a put and get method (see FileStore/RedisStore for reference).

## TODO:

Implement below stores:

- MysqlStore
