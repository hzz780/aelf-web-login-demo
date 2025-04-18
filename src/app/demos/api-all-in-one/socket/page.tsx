'use client';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { RequestAllInOne } from '@/app/demos/api-all-in-one/fetch-data';

export default function SocketPage() {
  const [client, setClient] = useState<any>();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (!client) {
      return;
    }
    client.socket('/socket-io/', {
      type: 'on',
      event: 'answer',
      callback: (response: any) => {
        console.log('answer: ', response);
        setMessage(response);
      },
      queryKey: ['answer'],
    });
  }, [client]);

  return (
    <>
      <p>Socket io demo.</p>
      <Button
        onClick={() => {
          const client = new RequestAllInOne({
            socketPath: '/socket-io/',
          });
          setClient(client);
          setMessage('init socket client');
        }}
      >
        Connect
      </Button>
      <Button
        onClick={() => {
          if (!client) {
            setMessage('Please connect at first');
            return;
          }
          console.log('Question: ');
          client.socket('/socket-io/', {
            type: 'emit',
            event: 'question-chat-gpt',
            value: 'question socket case',
            callback: (response: any) => {
              console.log(response.status);
              console.log(response.text);
              setMessage(response.text);
            },
            queryKey: ['connect'],
          });
        }}
      >
        Question
      </Button>
      <Button
        onClick={() => {
          if (!client) {
            setMessage('Please connect at first');
            return;
          }
          console.log('hello: ');
          client.socket('/socket-io/', {
            type: 'emit',
            event: 'hello',
            value: 'hzz780',
            callback: (response: any) => {
              console.log(response.status);
              console.log(response.text);
              setMessage(response.text);
            },
            queryKey: ['hello'],
          });
        }}
      >
        Trigger event answer
      </Button>
      <div>socket message: </div>
      <div>{message}</div>
    </>
  );
}
