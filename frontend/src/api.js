import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Get list of contacts
export const getContacts = () => {
  return axios.get(`${API_URL}/contacts`);
};

// Send OTP to a contact
export const sendOtp = (phoneNumber) => {
  return axios.post(`${API_URL}/send-otp`, { phoneNumber });
};

// Get list of sent messages
export const getMessages = () => {
  return axios.get(`${API_URL}/messages`);
};
