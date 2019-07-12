import axios from 'axios';

export function getActivitiesFromApi(data) {
  console.log(data);
  return axios.post('/', data).then(response => response.data);
}
