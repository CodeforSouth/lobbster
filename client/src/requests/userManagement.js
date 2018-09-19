import axios from 'axios';

export const getAccountsList = async () => {
  const response = await axios.get('/api/admin/accounts_list');
  return response.data;
};

export const getAccountDetails = async (emailAddress) => {
  const response = await axios.get('/api/admin/account_details', {
    params: {
      emailAddress
    }
  });
  return response.data;
};

export const modifyAccountDetails = async (
  _id,
  firstName,
  lastName,
  emailAddress,
  identityVerified,
  emailVerified,
  isAdmin
) => {
  const response = await axios.post(
    '/api/admin/modify_account_details',
    {
      params: {
        _id,
        firstName,
        lastName,
        emailAddress,
        identityVerified,
        emailVerified,
        isAdmin
      }
    }
  );
  return response.data;
};

export const deleteAccount = async () => { };
