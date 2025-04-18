import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { IBaseRequestOptions } from '@/app/demos/api-all-in-one/fetch-data';

export interface ISocketRequestOptions extends IBaseRequestOptions {
  type: 'on' | 'emit';
  event: string;
  value?: string;
  callback?: (args: any) => any;
  queryKey: string[];
  socketPath?: string;
}

// TODO
export const useWebSocket = (url: string, options: ISocketRequestOptions) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const _socket = io({
      path: url, // '/socket-io/'
    });

    _socket.emit(options.event, options.value, (response: any) => {
      console.log(response.status);
      console.log(response.text);
    });

    _socket.on(options.event, (socketId: string, message: string) => {
      console.log(options.event, socketId, message);
      const data = JSON.parse(message);

      queryClient.setQueryData(options.queryKey, (oldData: []) => {
        // 假设新数据是旧数据的更新，可以根据实际需求调整逻辑
        return [...(oldData || []), data];
      });
    });

    return () => {
      _socket.close();
    };
  }, [url, queryClient, options.queryKey, options.event, options.value]);
};
