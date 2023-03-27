import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

const countryApi = {};

countryApi.getCountries = async (slug) => {
    try {
        const res = await API.get(`country`);
        return res;
    } catch (error) {
        return error.response;
    }
};

export { countryApi };