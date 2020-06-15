const express = require('express');

// Import GraphQL middleware
const expressGraphQL = require('express-graphql');

// Import Mongo Db Client API
//@ts-ignore
const mongoose = require('mongoose');

// Import CORs middleware to allow connections from another URL:PORT
const cors = require('cors');

// Import mLab connection string
// const cs = require('./mlab-connection-string');

// Import GraphQL Schema used
const schema = require('./schema/schema.ts');

// Create a new app based on Express
const app = express();

// Allow cross origin requests
app.use(cors());

// Connect to database
mongoose
    .connect(
        `mongodb+srv://itamar:rKw6JQ12Cw5fvaSy@cluster0-qxyeq.mongodb.net/data?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(4000);
    })
    .catch(err => {
        console.log(err);
    });

// Configure and add the GraphQL middleware
app.use('/graphql', expressGraphQL({
    schema, // how our data look like (our graph look like)
    graphiql: true
}));

// Start listening for requests on PORT 4000 on this machine
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app is running on port ${port}` );
});

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (req, res) => {
//         // @ts-ignore
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//     });
// }




// const dbConfig = require('./config/database.config.ts');
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true, 
//     useFindAndModify: false
// }, (err) => {
//     if (err) {
//         process.exit(1);
//         console.log('unable to connect to database');
//     }
//     else
//         console.log('successfully connected to the database');
// });

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//     console.log(`app is running on port ${port}` );
// });