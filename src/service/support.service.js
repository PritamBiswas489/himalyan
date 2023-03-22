import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

export const getContentService = async (slug) => {
    try {
        const response = await API.get(`support/get-content/${slug}`);
        return response;
    } catch (error) {
        return error.response;
    }
};
