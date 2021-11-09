import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://app-my-access.herokuapp.com',
});
