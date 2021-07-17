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

2. Make sure you have a Heroku account and see your projects at https://dashboard.heroku.com/apps
3. Make sure to have the heroku Client and that you can use heroku commands in the command line https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up
4. The project must be a git repo
5. Open the terminal on the repo root, and run `heroku create` this will create the project