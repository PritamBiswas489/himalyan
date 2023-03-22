import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

const menuApi = {}

menuApi.menu = async () => {
  try {
    const res = await API.get('menu');
    return res;
  } catch (error) {
    return error.response;
  }
}

export { menuApi }