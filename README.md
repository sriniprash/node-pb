# node-pb
A minimalist PasteBin server in NodeJS.

To get the server running:

```
npm install #This should install the dependencies
node app.js #This should start the server at port 3000
```

To create a paste:

```
$ netstat -a | curl -X POST --data-binary @- -H "Content-Type: text/plain" "http://localhost:3000"
Paste Created with ID: 284c9fe80d97a70654cb137dd1a694e3
```

To fetch an existing post with id:

```
curl "localhost:3000/284c9fe80d97a70654cb137dd1a694e3"
```


