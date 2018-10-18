import axios from 'axios';

const handleToken = async (token, forYear) => {
  const response = await axios.post('/api/stripe', { token, forYear });
  return response.data;
};

export default handleToken;
