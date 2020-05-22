const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Show = require('./models/show.model.ts');

const app = express();

app.use(bodyParser.json());
app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`
          type Show {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
          }
          input ShowInput {
            title: String!
            description: String!
            price: Float!
            date: String!
          }
          type RootQuery {
              shows: [Show!]!
          }
          type RootMutation {
              createShow(showInput: ShowInput): Show
          }
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
        rootValue: {
            shows: () => {
                return Show.find()
                    .then(shows => {
                        return shows.map(show => {
                            return { ...show._doc, _id: show.id };
                        });
                    })
                    .catch(err => {
                        throw err;
                    });
            },
            createShow: args => {
                const show = new Show({
                    title: args.showInput.title,
                    description: args.showInput.description,
                    price: +args.showInput.price,
                    date: new Date(args.showInput.date)
                });
                return show
                    .save()
                    .then(result => {
                        console.log(result);
                        return { ...result._doc, _id: result._doc._id.toString() };
                    })
                    .catch(err => {
                        console.log(err);
                        throw err;
                    });
            }
        },
        graphiql: true
    })
);

// mongoose
//     .connect(
//         `mongodb+srv://itamar:rKw6JQ12Cw5fvaSy@cluster0-qxyeq.mongodb.net/shows?retryWrites=true&w=majority`
//     )
//     .then(() => {
//         app.listen(4000);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// console.log(process.env.MONGO_USER)


