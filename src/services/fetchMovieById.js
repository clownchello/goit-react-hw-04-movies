import axios from 'axios';
import data from './FetchData';
const { BASE_URL, API_KEY } = data;

export default function fetchMovieById(id) {
  return axios
    .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    .then(res => res.data);
}
