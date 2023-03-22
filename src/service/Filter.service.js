import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

const filterApi = {};

filterApi.filter = async (data) => {
    try {
        const res = await API.post('filter', data);
        return res;
    } catch (error) {
        return error.response;
    }
};

filterApi.filterByPagination = async (page, data) => {
    try {
        const res = await API.post(`filter?page=${page}`, data);
        return res;
    } catch (error) {
        return error.response;
    }
};

export { filterApi };
