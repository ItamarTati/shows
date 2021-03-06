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

const uri = process.env.mongodb || `mongodb+srv://itamar:rKw6JQ12Cw5fvaSy@cluster0-qxyeq.mongodb.net/data?retryWrites=true&w=majority`;
mongoose.connect(uri,
{
    useNewUrlParser: true,
    useFindAndModify: false
},(err)=>{
    if(err){
        process.exit(1);
        console.log('unable to connect to database');
    }
    else
        console.log('successfully connected to the database');
});

const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log('app is running');
});

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

