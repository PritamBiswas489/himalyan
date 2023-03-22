import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

export const blogListService = async (page = 1) => {
    try {
        const response = await API.get(`blog/list?page=${page}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const blogDetailsService = async (slug) => {
    try {
        const response = await API.get(`blog/details/${slug}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
