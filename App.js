import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';


// import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';


import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider, graphql } from 'react-apollo';

// Main App export
export default class ApolloApp extends React.Component {
  render() {
    return(
      <ApolloProvider client={client}>
        <SafeAreaView>
          <MovieDetails />
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}
 
// Apollo client

const client = new ApolloClient({
 
  link: new HttpLink({ uri: 'http://192.168.0.103:4000/' }),
  cache: new InMemoryCache().restore({}),
});
 
// Example query from https://www.graph.cool/
const MOVIE_QUERY = gql`
{
  randomPerson {
    id
    employee_name
    employee_salary
  }
}

`;
 
// MovieDetails Component
const MovieDetails = graphql(MOVIE_QUERY)(({ data }) => {
  const { error, randomPerson } = data;



  if (error) {
    
    return <Text>{error.message}</Text>;
  }
  if (randomPerson) {
    return (<Text>{randomPerson.id}  {randomPerson.employee_name}</Text>

    )
  }

  return <Text>Loading...</Text>;
});