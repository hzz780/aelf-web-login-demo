'use client';
import { io } from 'socket.io-client';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export default function SocketPage() {
  const [socket, setSocket] = useState<any>();
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('answer', (message: string) => {
      console.log('answer: ', message);
      setAnswer(message);
    });
  }, [socket]);

  return (
    <>
      <p>Socket io demo.</p>
      <Button
        onClick={() => {
          const _socket = io({
            path: '/socket-io/',
          });
          console.log('_socket: ', _socket);
          setSocket(_socket);
          _socket.on('connect', () => {
            console.log(_socket);
            console.log('connect !!!');
            setAnswer('connect !!!');
          });
        }}
      >
        Connect
      </Button>
      <Button
        onClick={() => {
          console.log('Question: ');
          socket.emit(
            'question-chat-gpt',
            'question socket case',
            (response: any) => {
              console.log(response.status);
              console.log(response.text);
              setAnswer(response.text);
            },
          );
        }}
      >
        Question
      </Button>
      <Button
        onClick={() => {
          console.log('hello: ');
          socket.emit('hello', 'hzz780');
        }}
      >
        Trigger event answer
      </Button>
      <div>answer: </div>
      <div>{answer}</div>
    </>
  );
}
