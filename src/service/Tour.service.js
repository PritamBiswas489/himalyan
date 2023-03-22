import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

const tourApi = {}

tourApi.tourDetailsBySlug = async (slug) => {
  try {
    const res = await API.get(`tour/${slug}`);
    return res;
  } catch (error) {
    return error.response;
  }
}

tourApi.popularTourList = async (slug) => {
  try {
    const res = await API.get(`popular-tour`);
    return res;
  } catch (error) {
    return error.response;
  }
}

tourApi.searchTour = async (slug) => {
  try {
    const res = await API.get(`search-tour/${slug}`);
    return res;
  } catch (error) {
    return error.response;
  }
}

export { tourApi }