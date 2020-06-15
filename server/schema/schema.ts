const graphQL = require('graphql');
// Import the models
//@ts-ignore
const Show = require('../models/show.model.ts');


// Import objects from graphql
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean
} = graphQL;



// Define Book Type
const ShowType = new GraphQLObjectType({
    name: 'Show',
    fields: () => ({
        // Fields exposed via query
        _id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        author: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        genres: {
            type: GraphQLString
        },
        frontCoverImage: {
            type: GraphQLString
        },
        backCoverImage: {
            type: GraphQLString
        },
        backgroundImage: {
            type: GraphQLString
        },
        trailer: {
            type: GraphQLString
        },
        animeReleaseDate: {
            type: GraphQLString
        },
        numberOfEpisodes: {
            type: GraphQLInt
        },
        isDubbed: {
            type: GraphQLBoolean
        },
        mangaChapters: {
            type: GraphQLInt
        },
        hasEnded: {
            type: GraphQLBoolean
        }
    })
});

// Define Query endpoints available on the GraphQL Server
// The top-level query object returns a `RootQueryType` object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        show: {
            // book() {} endpoint
            type: ShowType,
            args: {
                _id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Show.findById(args._id);
            }
        },

        shows: {
            // books {} endpoint
            type: new GraphQLList(ShowType),
            resolve(parent, args) {
                return Show.find({});
            }
        }
    }
});


// Export a GraphQL schema with Query and Mutation endpoints
module.exports = new GraphQLSchema({
    query: RootQuery,
});



