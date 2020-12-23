import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {typeDefs, resolvers} from './src/schema'

const server = new ApolloServer({ typeDefs, resolvers})

const app = express()

server.applyMiddleware({app}) //gonna pass in app into it

app.listen({port:4000}, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)


//https://www.apollographql.com/docs/apollo-server/integrations/middleware/

//source
//https://github.com/paulhklam1122/react-apollo-graphql-wmdd-4999-sept-2020

//https://github.com/linnovate/mean/issues/1066

//nodemon crash 있어서 port:3001로 바꾸니까 됨 ㅡㅡ