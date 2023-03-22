import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

const pagesApi = {}

pagesApi.home = async () => {
  try {
    const res = await API.get('page/home');
    return res;
  } catch (error) {
    return error.response;
  }
}

pagesApi.footer = async () => {
  try {
    const res = await API.get('page/footer');
    return res;
  } catch (error) {
    return error.response;
  }
}

export { pagesApi }