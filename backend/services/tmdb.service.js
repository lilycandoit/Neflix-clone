// this is to create function to fetch data from API paged name themoviedb.org
import { ENV_VARS } from '../config/envVars.js';
import axios from 'axios';

export const fetchFromTMDB = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status !== 200) {
    throw new Error('Failed to fetch data from TMDB' + response.statusText);
  }

  return response.data;
};
