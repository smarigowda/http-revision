import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH CODE FROM INSTANCE';

instance.interceptors.request.use(request => {
  return request;
})

export default instance;

