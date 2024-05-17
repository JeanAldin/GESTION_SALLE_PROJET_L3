import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { readFileSync } from 'fs';
import { pool } from './src/db/bd.mjs';
import { Mutation } from './src/Mutation/Mutation.mjs';
import { Query } from './src/query/query.mjs';

const schema = readFileSync("src/schema/schema.graphql", "utf-8");
 
const yoga = createYoga({

  schema: createSchema({
    typeDefs: /* GraphQL */
    schema,
    resolvers: {
      Query,
      Mutation  
    }
   
  }),
  context:{
    pool
  }
});

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')

})
