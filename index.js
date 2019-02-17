const { ApolloServer, gql,IResolverObject } = require('apollo-server');
const fetch = require('node-fetch')

// import RDS from './Rds'
// const RDS = require('./Rds').RDS
const RDS = require('./Rds');


const typeDefs = gql`

type Person {
  gender: String
  email: String
  phone: String
}
  type Query {
    randomPerson :[Person]
    randomPerson2 :[Person]
  }
`;

// const resolvers = {
//   Query: {
//     books: () => books
   
//   },
  
// };



const resolvers = {
  Query: {
    randomPerson: async() => {
      const response  = await fetch('https://api.randomuser.me/');
      const data = await response.json();
      // console.log(data)
      return data.results;
    },

    randomPerson2:  (_source, _args, { dataSources }) => {
      dataSources.getDetails.getData()
    

    }
  },
   
};



const server = new ApolloServer({ typeDefs, resolvers ,
  dataSources: () => ({
      getDetails: new RDS()
      
  })
});

// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`??  Server ready at ${url}`);
});