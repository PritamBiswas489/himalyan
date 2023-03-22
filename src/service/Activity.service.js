import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

const activityApi = {};

activityApi.listActivity = async () => {
    try {
        const res = await API.get(`activity/list`);
        return res;
    } catch (error) {
        return error.response;
    }
};

activityApi.activityBySlug = async (slug) => {
    try {
        const res = await API.get(`activity/by-slug/${slug}`);
        return res;
    } catch (error) {
        return error.response;
    }
};

export { activityApi };

export const activityContentService = async (data = {}) => {
    try {
        const response = await API.get(`activity/get-activity-content`);
        return response;
    } catch (error) {
        return error.response;
    }
};
