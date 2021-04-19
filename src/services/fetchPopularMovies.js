import axios from 'axios';
import constants from './FetchData';

const { BASE_URL, API_KEY } = constants;

export default function fetch() {
  return axios
    .get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`)
    .then(res => res.data);
}
