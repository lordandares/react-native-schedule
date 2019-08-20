// @flow
import fetch from 'react-native-fetch-polyfill';
import store from '../../store';

const FETCH_TIME_OUT = 30 * 1000;
const ERROR_CODE = '';

export default async (url: string, header: any = {}) => (
  new Promise((resolve, reject) =>
    fetch(url, { timeout: FETCH_TIME_OUT, ...header })
      .then(response => resolve(response))
      .catch((error) => {
        if (error === ERROR_CODE) {
          // we are going to use this in case that session
          // expired or network error to show a general error
          store.dispatch({});
        }
        reject(error);
      }))
);
