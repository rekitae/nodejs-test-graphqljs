
import _ from 'underscore';

import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLType,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql';

import Users from './data/Users';

let count = 0;

const resolverMap =
{
    count: () => count++,
    testArray: () => [1,2,3,4,5],
    user: (root, args) => {
        console.log(root);
        return Users[args._id] || Users['ktlee'];
    },
    users: () => _.values(Users),
    setCount: (root, args) => { return (count=args.count) },
    createUser: (root, args) => {
        let user = Object.assign(args, {});

        user._id = user.name;
        
        if (Users[user._id])
            throw new Error('User already exists: ' + user._id);
        
        Users[user._id] = user;

        return user;
    }
}

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        count: {
            type: GraphQLInt,
            resolve: resolverMap.count
        },
        testArray: {
            type: new GraphQLList(GraphQLInt),
            resolve: resolverMap.testArray
        },
        users: {
            type: new GraphQLList(User),
            resolve: resolverMap.users
        },
        user: {
            type: new GraphQLNonNull(User),
            args: {
                _id: {
                    type: new GraphQLNonNull(GraphQLString),
                    descrption: "_id로 찾는다"
                }
            },
            resolve: resolverMap.user
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: () => ({
        setCount: {
            type: GraphQLInt,
            args: {
                count: {
                    type: new GraphQLNonNull(GraphQLInt),
                    descrption: "변경할 카운터를 입력"
                }
            },
            resolve: (root, args) => resolverMap.setCount(root, args)
        },
        createUser: {
            type: User,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
                address: {
                    type: GraphQLString
                }
            },
            resolve: (root, args) => resolverMap.createUser(root, args)
        }
    })
});

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLString),
            description:"유저키"
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description:"이름"
        },
        age: {
            type:GraphQLInt,
            descrption:"나이"
        },
        address: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: function(user) {
                return user.address || "Does not exist";
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

export default schema;
