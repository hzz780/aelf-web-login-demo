import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

export const queryCountries = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;
