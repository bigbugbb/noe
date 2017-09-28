const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});