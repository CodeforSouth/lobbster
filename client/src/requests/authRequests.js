import axios from 'axios';

export const fetchUser = async () => {
  const response = await axios.get('/api/current_user');
  return response.data;
};

export const login = async (emailAddress, password) => {
  const response = await axios.post('/api/login', {
    emailAddress,
    password
  });
  return response;
};

export const registerUser = async (firstName, lastName, emailAddress, password) => {
  const response = await axios.post('/api/register', {
    firstName,
    lastName,
    emailAddress,
    password
  });
  return response.status;
};

export const logout = async () => {
  const response = await axios.post('/api/logout', {});
  return response.status;
};
