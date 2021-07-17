# Development

To activate debugging, change the start script in package json to:

* "start": "set DEBUG=express:* && nodemon src/index.js"

# Deployment

## Deploying on Heroku

1. Make sure package json includes the node version

```
  "engines": {
    "node": "12.18.4"
  },
```

2. 