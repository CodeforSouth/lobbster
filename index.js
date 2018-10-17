const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/PrincipalDisclosure');
require('./models/PaymentDocumentation');
require('./services/passport');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

const store = new MongoDBStore({
  uri: keys.mongoURI,
  collection: 'sessions'
});
store.on('connected', () => store.client);

app.use(express.static('public'));
app.use(expressSession({
  secret: keys.expressSessionSecret,
  store,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authorization')(app);
require('./routes/userManagement')(app);
require('./routes/principalDisclosure')(app);
require('./routes/paymentDocumentation')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
