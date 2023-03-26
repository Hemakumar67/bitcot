var express = require('express');
var app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const session = require('express-session');
const { connectDB } = require('./db');
const cors = require('cors');
app.use(cors());
const route = require('./router/routes')
const bodyParser = require('body-parser');
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', route);

// Configure session middleware
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));

// Configure Passport with Facebook strategy
passport.use(new FacebookStrategy({
    clientID: 'YOUR_APP_ID',
    clientSecret: 'YOUR_APP_SECRET',
    callbackURL: 'http://localhost:8000/auth/facebook/callback'
}, (accessToken, refreshToken, profile, cb) => {
    console.log(`accessToken : ${accessToken} and refreshToken :${refreshToken}`)
    return cb(null, profile);
}));

// Configure Passport to serialize/deserialize user
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

//Facebook routing parts
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
        res.send('You have been successfully authenticated with Facebook!');
    }
);

app.listen('8000', (req, res) => {
    console.log('server start 8000 port is running')
})