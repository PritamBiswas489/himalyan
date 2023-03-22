import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_HOST_API,
});

export const destinationListService = async () => {
    try {
        const response = await API.get(`customize-trip/destination-list`);
        return response;
    } catch (error) {
        return error.response;
    }
};
export const tourSearchService = async (data) => {
    try {
        const response = await API.post(`customize-trip/tour-search`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const addTripService = async (data) => {
    try {
        const response = await API.post(`customize-trip/add-trip`, data);
        return response;
    } catch (error) {
        return error.response;
    }
};
