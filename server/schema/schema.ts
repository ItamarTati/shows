const { GraphQLDateTime } = require('graphql-iso-date')
const graphQL = require('graphql');
//@ts-ignore
const Show = require('../models/show.model.ts');
const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} = graphQL;


const ShowType = new GraphQLObjectType({
    name: 'Show',
    fields: () => ({
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
            type: new graphql.GraphQLList(graphql.GraphQLString)
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
            type: GraphQLDateTime
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        show: {
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
            type: new GraphQLList(ShowType),
            resolve(parent, args) {
                return Show.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});



