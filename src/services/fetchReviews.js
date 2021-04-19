import axios from 'axios';
import data from './FetchData';
const { BASE_URL, API_KEY } = data;

export default function fetchCast(id) {
  return axios
    .get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
    .then(res => res.data);
}
