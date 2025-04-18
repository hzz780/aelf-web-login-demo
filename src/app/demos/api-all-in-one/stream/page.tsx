'use client';
import { useState } from 'react';
import { Button } from 'antd';
import { fetchEventSource } from '@microsoft/fetch-event-source';

let message = '';
export default function Fetch() {
  const [data, setData] = useState<any>('');
  return (
    <>
      <div>
        <Button
          onClick={async () => {
            // await fetchEventSource('http://localhost:3100/api/chaingpt', {
            await fetchEventSource('/api/chaingpt', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                data: 'hello hzz780',
              }),
              onmessage(ev) {
                console.log(ev.data, ' | ', data, ' | ', message);
                const _data = data + ev.data;
                message += ev.data;
                setData(message);
              },
              onclose() {
                console.log('close');
                setTimeout(() => {
                  setData('');
                  message = '';
                }, 2000);
              },
            });
          }}
        >
          Click to fetch stream
        </Button>
        <div>{data}</div>
      </div>
    </>
  );
}
