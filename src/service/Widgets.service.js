import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
});

const widgetsApi = {}

widgetsApi.whyBok = async () => {
  try {
    const res = await API.get(`widgets/why-book`);
    return res;
  } catch (error) {
    return error.response;
  }
}

widgetsApi.customerSupport = async () => {
  try {
    const res = await API.get(`widgets/customer-support`);
    return res;
  } catch (error) {
    return error.response;
  }
}

widgetsApi.countDown = async () => {
  try {
    const res = await API.get(`widgets/count-down`);
    return res;
  } catch (error) {
    return error.response;
  }
}

widgetsApi.whatClientSay = async () => {
  try {
    const res = await API.get(`widgets/what-client-say`);
    return res;
  } catch (error) {
    return error.response;
  }
}

widgetsApi.recommendedTour = async () => {
  try {
    const res = await API.get(`widgets/recommended-tour`);
    return res;
  } catch (error) {
    return error.response;
  }
}

widgetsApi.serviceExcellence = async () => {
  try {
    const res = await API.get(`widgets/service-excellence`);
    return res;
  } catch (error) {
    return error.response;
  }
}

widgetsApi.weAreMember = async () => {
  try {
    const res = await API.get(`widgets/we-are-member`);
    return res;
  } catch (error) {
    return error.response;
  }
}

export { widgetsApi }