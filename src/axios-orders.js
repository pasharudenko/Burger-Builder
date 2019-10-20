import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://test-d4636.firebaseio.com/'
});

export default instance;