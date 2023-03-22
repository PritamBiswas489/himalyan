import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
  // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

const bookingApi = {}

bookingApi.createBooking = async (data) => {
  try {
    const res = await API.post('checkout/create', data);
    return res;
  } catch (error) {
    return error.response;
  }
}

bookingApi.validCoupon = async (data) => {
  try {
    const res = await API.post('checkout/check-coupon', data);
    return res;
  } catch (error) {
    return error.response;
  }
}

// bookingApi.register = async (data) => {
//   try {
//     const res = await API.post('signup', data);
//     return res;
//   } catch (error) {
//     return error.response;
//   }
// }

export { bookingApi }