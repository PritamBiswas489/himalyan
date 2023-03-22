import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

const regionApi = {};

regionApi.regionBySlug = async (slug) => {
    try {
        const res = await API.get(`region/by-slug/${slug}`);
        return res;
    } catch (error) {
        return error.response;
    }
};

regionApi.regionContentService = async () => {
    try {
        const res = await API.get(`region/get-region-content`);
        return res;
    } catch (error) {
        return error.response;
    }
};

export { regionApi };