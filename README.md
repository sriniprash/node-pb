# node-pb
A minimalist PasteBin server in NodeJS.

## Getting Started:

```
npm install #This should install the dependencies
```
Update the storeDirectory parameter of config.js file accordingly.

```
node app.js #This should start the server at port 3000
```

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

Currently, there is one implementation of the AbstractStore type i.e a FileStore (stores the pastes in the filesystem). To implement other storage types, extend the AbstractStore class and implement a put and get method (see FileStore for reference).

## TODO:

Implement below stores:

- RedisStore
- MysqlStore
