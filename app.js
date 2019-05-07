const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
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
app.use('/api', routes);
//app.listen(process.env.PORT || 3000)

let port = process.env.PORT || 1235;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
