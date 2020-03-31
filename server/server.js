const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');

const auth = require('./routes/auth');


mongoose.connection.on('connected', () => {
  console.log('Connected to database!');
});
mongoose.connect(process.env.MONGODB_URI);

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    stringify: false
  }),
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, (err, user) => {
      console.log("AUTHENTICATE")
      console.log(username)
      console.log(err)
      console.log(user)
    if (err) return done(err);
    if (!user) return done(null, false);
    if (user.password !== password) return done(null, false);
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

//app.use('/api', routes(City, Hotel));
app.use('/api', auth(passport, axios, User));
//app.use('/api', protected(User, Hotel, Listing));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}!`));
