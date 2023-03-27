import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

const reviewApi = {}

reviewApi.list = async (slug) => {
  try {
    const res = await API.get(`review/list`);
    return res;
  } catch (error) {
    return error.response;
  }
}

export { reviewApi }