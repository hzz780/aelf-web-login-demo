import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { IBaseRequestOptions } from '@/app/demos/api-all-in-one/fetch-data';

export interface IApolloRequestOptions extends IBaseRequestOptions {
  apolloConfig?: any;
  query?: any;
}

interface IApolloClientOptions {
  uri: any;
  cache: any;
}
export const createApolloClient = (options: IApolloClientOptions) => {
  return new ApolloClient({
    // uri: "https://countries.trevorblades.com",
    // cache: new InMemoryCache(),
    uri: options.uri || 'https://countries.trevorblades.com',
    cache: options.cache || new InMemoryCache(),
  });
};

export const queryCountries = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;
