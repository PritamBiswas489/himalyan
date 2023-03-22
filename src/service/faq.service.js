import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

export const categoryListService = async () => {
    try {
        const response = await API.get(`faq/category-list`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const faqListService = async (data = {}, page = 1) => {
    try {
        const response = await API.post(`faq/faq-list-by-cat?page=${page}`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const faqContentService = async (data = {}) => {
    try {
        const response = await API.get(`faq/get-faq-content`);
        return response;
    } catch (error) {
        return error.response;
    }
};
