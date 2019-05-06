const express = require('express');

var app = express();
app.get('/', (req, res) => {
    res.send('Hello Express')
});
//app.listen(process.env.PORT || 3000)

let port = process.env.PORT || 1235;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
