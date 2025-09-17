import api from './api';

const register = (userData) => {
  return api.post('/auth/register', userData);
};
const login = (credentials) => {
  return api.post('/auth/login', credentials);
};
const verifyOtp = (otpData) => {
  return api.post('/auth/verify-otp', otpData);
};
const sendOtp = (resendData) => {
    return api.post('/auth/send-otp', resendData);
};
const resetPassword = (data) => {
    return api.put('/auth/reset-password', data);
};
const logout = () => {
  return api.post('/auth/logout');
};


export const authService = {
  register,
  login,
  verifyOtp,
  sendOtp,
  resetPassword,
  logout,
};