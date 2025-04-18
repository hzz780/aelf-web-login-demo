'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { RequestAllInOne } from 'request-all-in-one';
interface Props {
  readonly children: ReactNode;
}
export const CSRFTokenContext = createContext<string>('');

export const CSRFTokenProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    const token = localStorage.getItem('csrfToken');
    if (token) {
      setToken(token);
    }
    const fetchToken = async () => {
      const client = new RequestAllInOne({});
      const response = await client.post('/v1/token');
      if (response.code && response.code === '20000') {
        localStorage.setItem('csrfToken', response.data);
        setToken(response.data);
        return response.data;
      }
      throw Error('fetch token error');
    };
    fetchToken()
      .then((token) => {
        console.log('fetch token done', token);
      })
      .catch((error) => {
        console.log('fetch token error: ', error);
      });
  }, []);

  return (
    <CSRFTokenContext.Provider value={token}>
      {children}
    </CSRFTokenContext.Provider>
  );
};
