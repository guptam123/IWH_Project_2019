const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const routes1 = require('./routes/route_registration'); // Imports routes for the products
const session = require('express-session');//for storing sessions
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser=require('cookie-parser'); //for storing cookies
const expressValidator = require('express-validator'); //for checkBody function
var app = express();
app.get('/', (req, res) => {
    res.send('Hello Express')
});


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://arcade:4mlabACC@firstcluster-yc1pt.mongodb.net/virago?retryWrites=true';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use('/api', routes);
//user_register route
app.use('/user_register',routes1);

//Using Session
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));
//Cookie
app.use(cookieParser());




let port = process.env.PORT || 1235;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
