import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import {
  buildSchema,
  Resolver,
  Query,
  Arg,
  ObjectType,
  Field,
  ID,
} from "type-graphql";
import { DogsResolver } from "@/schema/dogs.resolver";

// @ObjectType()
// export class Dog {
//   @Field(() => ID)
//   name: string;
// }

// @Resolver(Dog)
// export class DogsResolver {
//   @Query(() => [Dog])
//   dogs(): Dog[] {
//     return [{ name: "Doggie" }, { name: "Doggie Dawg" }];
//   }
// }

const schema = await buildSchema({
  resolvers: [DogsResolver],
});

const resolvers = {
  Query: {
    hello: () => "world",
    test: () => {
      return "Test";
    },
  },
};

const typeDefs = gql`
  type Query {
    hello: String
    test: String
  }
`;

// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
// });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default startServerAndCreateNextHandler(server, {
//   context: async (req, res) => ({ req, res, user: await getLoggedInUser(req) }),
// });
