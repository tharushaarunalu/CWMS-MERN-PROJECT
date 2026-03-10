import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
});

export const fetchBookingsByMobileNo = (mobileNo) => API.get(`/admin/search-bookings?mobileNo=${mobileNo}`);
export const fetchAllBookings = () => API.get('/admin/bookings');
export const editBooking = (id, data) => API.post(`/admin/edit-booking/${id}`, data);
export const deleteBooking = (id) => API.post(`/admin/delete-booking/${id}`);

export default API;
