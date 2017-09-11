require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session');


const app = express()


//MIDDLEWARE
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//DATABASE CONNECTION
massive(process.env.CONNECTIONSTRING).then( db => {
    app.set('db', db);
})

//AUTHENTICATION
passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');

   db.find_user(profile.id).then( user => {
        if(user[0]) {
            return done(null, user);
        } else {
            db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.id]).then( user => {
                return done(null, user[0]);
            })
        }
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    app.get('db').userAndCart(user[0].id).then( user => {
        return done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/private',
    failureRedirect: 'http://localhost:3000/#/'
}));

app.get('/auth/me', (req, res) => {
    if(!req.user) {
        return res.status(404).send('User not found')
    } else {
        return res.status(200).send(req.user);
    }
})

app.get('/auth/logout', (req, res) => {
    req.logOut() 
    return res.redirect(302, 'http://localhost:3000/#/'); 
})


app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
})