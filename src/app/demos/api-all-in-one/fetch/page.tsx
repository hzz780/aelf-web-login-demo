'use client';
// import {RequestAllInOne} from '@/app/demos/api-all-in-one/fetch-data';
import { RequestAllInOne } from 'request-all-in-one';
import { useEffect, useState } from 'react';

const client = new RequestAllInOne({});

export default function Fetch() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.get(
        'https://api.github.com/repos/TanStack/query',
      );
      setData(response);
    };
    fetchData();
  }, []);

  if (!data) {
    return <>No data</>;
  }

  return (
    <>
      <div>
        <div> Fetch Only </div>
        <h1>{data.full_name}</h1>
        <p>{data.description}</p>
        <strong>👀 {data.subscribers_count}</strong>{' '}
        <strong>✨ {data.stargazers_count}</strong>{' '}
        <strong>🍴 {data.forks_count}</strong>
        {/*<div>{isFetching ? 'Updating...' : ''}</div>*/}
      </div>
    </>
  );
}
