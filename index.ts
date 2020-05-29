const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

const dbConfig = require('./config/database.config.ts');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});


const showRoutes = require('./routes/show.routes.ts')
app.use('/shows', showRoutes)

app.listen(port, () => {
    console.log(`Node server is listening on port ${port}`);
});