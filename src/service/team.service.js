import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

export const teamListService = async (page = 1) => {
    try {
        const response = await API.get(`team/list?page=${page}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const teamDetailsService = async (slug) => {
    try {
        const response = await API.get(`team/details/${slug}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const teamContentService = async (data = {}) => {
    try {
        const response = await API.get(`team/get-team-content`);
        return response;
    } catch (error) {
        return error.response;
    }
};
