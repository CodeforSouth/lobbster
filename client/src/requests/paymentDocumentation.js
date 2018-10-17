import axios from 'axios';

export const fetchPaymentsDocumentation = async (accountId) => {
  const response = await axios.get('/api/payments_documentation', {
    params: {
      accountId
    }
  });
  return response.data;
};

export const updatePaymentsDocumentation = async (updatedDocs) => {
  const response = await axios.post(
    '/api/update_payments_documentation',
    { params: { updatedPaymentsDocumentation: updatedDocs } }
  );
  return response.data;
};
