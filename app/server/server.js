require('dotenv').config()

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , session = require('express-session')
    , orderCtrl = require('./controllers/orders_controller')
    , productCtrl = require('./controllers/products_controller')
    , cartCtrl = require('./controllers/cart_controller');


const app = express()


//MIDDLEWARE
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


//DATABASE CONNECTION
massive(process.env.CONNECTIONSTRING).then( db => {
    app.set('db', db);

    app.get('db').init.seed_file().then(res => console.log(res))
    .catch(err => console.log(err))
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
            db.create_user([profile.displayName, profile.id]).then( user => {
                return done(null, user[0]);
            })
        }
    })
}))

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    app.get('db').getUserCart(user[0].id).then( user => {
        console.log(user)
        return done(null, user[0]);
    })
})

app.get('/auth', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:4011/#/store',
    failureRedirect: 'http://localhost:4011/#/'
}));

app.get('/auth/me', (req, res) => {
    console.log('req.user: ', req.user)
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

// ORDERS
app.post('/api/createOrder/:userid', orderCtrl.createOrder);
app.put('/api/completeThenCreaterOrder/:orderid/:userid', orderCtrl.completeOrder, orderCtrl.createOrder);
app.get('/api/order/:userid', orderCtrl.getUserOrder);
app.get('/api/completedOrder:userid', orderCtrl.getUserHistory);

//PRODUCTS
app.get('/api/products', productCtrl.getProducts);

// CART 
app.get('/api/getCart/:cartid', cartCtrl.getCart);
app.post('/api/addToCart/:cartid', cartCtrl.addToCart);
app.put('/api/update/qty/:productid', cartCtrl.updateProductInCart);
app.delete('/api/deleteFromCart/:productid', cartCtrl.deleteProductInCart);

app.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT)
})