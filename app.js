const bodyParser = require('body-parser');
const express = require('express');
const route = require('./routes/route');
const path = require('path');
const sequelize = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(route);

sequelize.sync().then(() => {
    app.listen(port)
}).catch(err => console.log(err));