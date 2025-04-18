'use client';
import { RequestAllInOne } from 'request-all-in-one';
import { useContext, useState } from 'react';
import { Button } from 'antd';
import { CSRFTokenContext } from '@/app/demos/api-all-in-one/author/csrfTokenProvider';

const client = new RequestAllInOne({});
export default function Author() {
  const csrfToken = useContext(CSRFTokenContext);
  console.log('csrfToken: ', csrfToken);
  const [data, setData] = useState<any>('');

  return (
    <>
      <div>
        <Button
          onClick={async () => {
            const response = await client.post('/v1/api/app/author', {
              body: {
                name: 'string',
                birthDate: '2024-08-08T10:55:44.335Z',
                shortBio: 'string',
              },
              headers: {
                RequestVerificationToken: csrfToken,
              },
            });
            setData(JSON.stringify(response));
          }}
        >
          Post Author
        </Button>
        <Button
          onClick={async () => {
            const response = await client.get(
              '/v1/api/app/author/620a13a3-0d9e-e900-2b28-3a143e37d66d',
            );
            setData(JSON.stringify(response));
          }}
        >
          Get Author Info
        </Button>
        <div>{data}</div>
      </div>
      <div>
        <div>Request token and storage in local by default</div>
        <Button
          onClick={async () => {
            const response = await client.post('/token');
            setData(JSON.stringify(response));
          }}
        >
          Post to Get Token
        </Button>
      </div>
    </>
  );
}
