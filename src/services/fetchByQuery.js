import axios from 'axios';
import data from './FetchData';
const { BASE_URL, API_KEY } = data;

export default function fetchByQuery(query) {
  return axios
    .get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(res => res.data);
}
