import createApolloClient, {
  queryCountries,
} from '@/app/demos/graphql/apollo-client';
async function getData() {
  const client = createApolloClient();
  const { data } = await client.query({
    query: queryCountries,
  });

  return data.countries.slice(0, 4);
}

export default async function Graphql() {
  const countries = await getData();
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
