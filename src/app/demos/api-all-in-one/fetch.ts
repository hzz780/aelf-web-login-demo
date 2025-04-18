import { IBaseRequestOptions } from '@/app/demos/api-all-in-one/fetch-data';

export const fetchData = async (
  url: string,
  options: IBaseRequestOptions = {},
) => {
  const { method = 'GET', headers = {}, body } = options;

  const fetchOptions: any = {
    method,
    headers,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
