import {
  createApolloClient,
  IApolloRequestOptions,
} from '@/app/demos/api-all-in-one/apollo-client';
import { fetchData } from '@/app/demos/api-all-in-one/fetch';
import { ApolloClient, gql } from '@apollo/client';
import { io, Socket } from 'socket.io-client';
import { ISocketRequestOptions } from '@/app/demos/api-all-in-one/socket-io';

export interface IBaseRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any; // Record<string, any>;
}

export interface IRequestOptions
  extends ISocketRequestOptions,
    IApolloRequestOptions {}

export const defaultHeaders = {
  'Content-Type': 'application/json',
};

export class RequestAllInOne {
  private readonly headers: Record<string, string>;
  private readonly apolloConfig: any;
  private readonly apolloClient: ApolloClient<any> | undefined; // TCacheShape
  public socketClient: Socket | undefined;
  private options: Partial<IRequestOptions>;
  constructor(options: Partial<IRequestOptions>) {
    this.options = options || {};
    this.headers = options.headers || defaultHeaders;

    if (options.socketPath) {
      this.socketClient = io({
        path: options.socketPath,
      });
    }
    if (options.apolloConfig) {
      this.apolloConfig = options.apolloConfig;
      this.apolloClient = createApolloClient(this.apolloConfig);
    }
  }

  async get(url: string) {
    return fetchData(url, { headers: this.headers });
  }

  async post(url: string, options: IBaseRequestOptions = {}) {
    return fetchData(url, {
      method: 'POST',
      headers: {
        ...this.headers,
        ...options.headers,
      },
      body: options.body,
    });
  }

  async gql(url: string, options: IApolloRequestOptions = {}) {
    if (!this.apolloClient) {
      throw Error('No apollo client found');
    }
    const { data } = await this.apolloClient.query({
      query: gql`
        ${options.query}
      `,
    });

    return data;
  }

  socket(url: string, options: ISocketRequestOptions) {
    let socketClient = this.socketClient;
    if (this.options.socketPath !== url || !socketClient) {
      socketClient = io({
        path: options.socketPath,
      });
    }
    if (options.type === 'on') {
      socketClient.on(options.event, (response: any) => {
        console.log(options.event, response);
        options.callback && options.callback(response);
      });
    } else {
      socketClient.emit(options.event, options.value, (response: any) => {
        console.log(response);
        options.callback && options.callback(response);
      });
    }
  }
}
