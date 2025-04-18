'use client';
import createApolloClient, {
  queryCountries,
} from '@/app/demos/graphql/apollo-client';
import { ApolloProvider, useQuery } from '@apollo/client';

const client = createApolloClient();
export default function Client() {
  return (
    <ApolloProvider client={client}>
      <Countries />
    </ApolloProvider>
  );
}
function Countries() {
  const { data, loading, error } = useQuery(queryCountries);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const countries = data.countries.slice(0, 4);

  return (
    <div>
      {countries.map((country: any) => (
        <div key={country.code}>
          <h3>{country.name}</h3>
          <p>
            {country.code} - {country.emoji}
          </p>
        </div>
      ))}
    </div>
  );
}
