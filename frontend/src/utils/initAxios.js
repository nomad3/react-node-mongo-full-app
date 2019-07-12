import axios from 'axios';

export default function(t) {
  const token = t ? t : localStorage.getItem('token');

  axios.defaults.baseURL = 'http://54.39.20.74:4000';
  //axios.defaults.baseURL = process.env.APP_API_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const errorHandler = error => {
    if (error.response && 401 === error.response.status) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = '/auth/login';
    } else {
      return Promise.reject(error);
    }
  };

  axios.interceptors.response.use(response => response, errorHandler);
}
