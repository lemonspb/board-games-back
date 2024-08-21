import axiosBase from 'axios';
import axiosRetry from 'axios-retry';
import { xml2json } from 'xml-js';

export const axiosBgg = axiosBase.create({
  baseURL: 'https://api.geekdo.com/xmlapi2/',
});

axiosRetry(axiosBgg, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

axiosBgg.interceptors.response.use(
  (response) => {
    try {
      const jsonData = xml2json(response.data, { compact: true });
      response.data = jsonData;
      return response;
    } catch (error) {
      throw new Error('Failed to parse XML data from BGG');
    }
  },
  (error) => {
    return Promise.reject(`Unexpected error calling BGG API: ${error.stack}`);
  },
);
