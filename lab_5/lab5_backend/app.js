const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');
const { createClient } = require('redis');
const { v4: uuidv4 } = require('uuid');

const client = createClient();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  
    type ImagePost {
        id: ID!
        url: String!
        posterName: String!
        description: String
        userPosted: Boolean!
        binned: Boolean!
        numBinned: Int!
    }

    type Query {
        unsplashImages (pageNum : Int): [ImagePost],
        binnedImages : [ImagePost],
        userPostedImages : [ImagePost]
    }

    type Mutation {
        uploadImage(
            url: String!, 
            description: String, 
            posterName: String
        ): ImagePost,
        updateImage(
            id: ID!,
            url: String, 
            posterName: String, 
            description: String, 
            userPosted: Boolean, 
            binned: Boolean
        ): ImagePost,
        deleteImage(
            id: ID!
        ): ImagePost
    }
`;

const resolvers = {
    Query: {
        unsplashImages: async (_, args) => {
            const postData = [];
            try {
                const { data } = await axios.get("https://api.unsplash.com/photos/?client_id=LwQ_DFBlcMcSswsKOTCDm4alOxfBL-Hrm23RLruM8yc&page="
                    + args.pageNum);
                data.forEach(element => {
                    postData.push({
                        id: element.id,
                        url: element.urls.raw,
                        posterName: element.user.username,
                        description: element.description,
                        userPosted: false,
                        binned: false,
                        numBinned: 0
                    });
                });
                return postData;
            } catch (error) {
                console.log(error);
                return error;
            }


        },
        binnedImages: async () => {
            const client = createClient();
            client.on('error', (err) => console.log('Redis Client Error', err));
            await client.connect();

            const data = await client.HGETALL("posts");
            console.log(Object.values(data))
            const postData = Object.values(data).map(ele => JSON.parse(ele)).filter(ele => ele.binned === true);
            await client.quit();

            console.log(postData);
            return postData;
        },
        userPostedImages: async () => {
            const client = createClient();
            client.on('error', (err) => console.log('Redis Client Error', err));
            await client.connect();

            const data = await client.HGETALL("posts");
            const postData = Object.values(data).map(ele => JSON.parse(ele)).filter(ele => ele.userPosted === true);

            await client.quit();

            return postData;
        }
    },
    Mutation: {
        uploadImage: async (_, args) => {
            args.id = uuidv4();
            args.binned = false;
            args.userPosted = true;

            const client = createClient();
            client.on('error', (err) => console.log('Redis Client Error', err));
            await client.connect();

            const info = await client.HSET("posts", args.id, JSON.stringify(args));

            await client.quit();

            return args;
        },
        updateImage: async (_, args) => {
            const client = createClient();
            client.on('error', (err) => console.log('Redis Client Error', err));
            await client.connect();

            if (args.binned === true) {
                await client.HSET("posts", args.id, args);
            } else {
                const info = await client.HDEL("posts", args.id);
                console.log(info);
            }

            await client.quit();

            return args;
        },
        deleteImage: async (_, args) => {
            const client = createClient();
            client.on('error', (err) => console.log('Redis Client Error', err));
            await client.connect();

            const info = await client.HDEL("posts", args.id);
            console.log(info);

            await client.quit();

            return args;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url} 🚀`);
});
