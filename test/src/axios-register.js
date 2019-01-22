import axios from 'axios';

const instance = axios.create({  
  // baseURL: 'https://ernyca-test.firebaseio.com'
  baseURL: 'http://192.168.20.102:8000'
})

export default instance;