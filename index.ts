// @ts-ignore
const express = require('express');
// @ts-ignore
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const showRoutes = require('./routes/show.routes.ts')
app.use('/shows', showRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        // @ts-ignore
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}


const dbConfig = require('./config/database.config.ts');
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, 
    useFindAndModify: false
}, (err) => {
    if (err) {
        process.exit(1);
        console.log('unable to connect to database');
    }
    else
        console.log('successfully connected to the database');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`app is running on port ${port}` );
});