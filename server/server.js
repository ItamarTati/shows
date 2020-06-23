const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema.js');
const app = express();


app.use(cors());
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}
let url = process.env.mongodb || `mongodb+srv://itamar:rKw6JQ12Cw5fvaSy@cluster0-qxyeq.mongodb.net/data?retryWrites=true&w=majority`

mongoose
    .connect(
        url 
    )
    .then(() => {
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`app is running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

