/** App use this express framework , mongoose database */
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const config = require('./database.js');

/** Cors */
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

/** Body-Parser Use */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/** Mongoose DataBase Connection */
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

/** Router */
const userrouter = require('./route/user.route');
const loginrouter = require('./route/auth.route');
const tweetsrouter = require('./route/tweets.route');

/** Use Router */
app.use('/', tweetsrouter);
app.use('/api/v1', loginrouter);
app.use('/user', userrouter);

/** Server Run 4000 Port Number */
app.listen(4000);

module.exports = app;