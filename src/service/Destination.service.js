import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

const destinationApi = {};

destinationApi.list = async (slug) => {
    try {
        const res = await API.get(`destination/list`);
        return res;
    } catch (error) {
        return error.response;
    }
};

destinationApi.difficultyList = async (slug) => {
    try {
        const res = await API.get(`difficulty/list`);
        return res;
    } catch (error) {
        return error.response;
    }
};

destinationApi.activityList = async (slug) => {
    try {
        const res = await API.get(`activity/list`);
        return res;
    } catch (error) {
        return error.response;
    }
};

destinationApi.filter = async (data) => {
    try {
        const res = await API.post('destination/filter', data);
        return res;
    } catch (error) {
        return error.response;
    }
};

destinationApi.filterByPagination = async (page, data) => {
    try {
        const res = await API.post(`destination/filter?page=${page}`, data);
        return res;
    } catch (error) {
        return error.response;
    }
};

destinationApi.destinationBySlug = async (data) => {
    try {
        const res = await API.get(`destination/by-slug/${data}`);
        return res;
    } catch (error) {
        return error.response;
    }
};

export { destinationApi };

export const DestinationContentService = async (data = {}) => {
    try {
        const response = await API.get(`destination/get-destination-content`);
        return response;
    } catch (error) {
        return error.response;
    }
};
