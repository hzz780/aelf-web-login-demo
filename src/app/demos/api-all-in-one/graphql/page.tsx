'use client';
import { RequestAllInOne } from '@/app/demos/api-all-in-one/fetch-data';
import { useEffect, useState } from 'react';
import { queryCountries } from '@/app/demos/graphql/apollo-client';
import { InMemoryCache } from '@apollo/client';

const client = new RequestAllInOne({
  apolloConfig: {
    uri: 'https://countries.trevorblades.com',
    cache: new InMemoryCache(),
  },
});

export default function Fetch() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.gql('https://countries.trevorblades.com', {
        query: queryCountries,
      });
      const countries = response.countries.slice(0, 4);
      setData(countries);
    };
    fetchData();
  }, []);

  if (!data) {
    return <>No data</>;
  }

  return (
    <div>
      {data.map((country: any) => (
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
