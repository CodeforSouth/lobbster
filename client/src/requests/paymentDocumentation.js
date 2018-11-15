import axios from 'axios';

export const fetchPaymentsDocumentation = async (accountId) => {
  const response = await axios.get('/api/payments_documentation', {
    params: {
      accountId
    }
  });
  return response.data;
};

export const fetchAllPaymentsDocumentations = async () => {
  const response = await axios.get('/api/all_payments_documentation');
  return response.data;
};

export const updatePaymentsDocumentation = async (updatedDocs) => {
  const response = await axios.post(
    '/api/update_payments_documentation',
    { params: { updatedPaymentsDocumentation: updatedDocs } }
  );
  return response.data;
};

export const fetchYears = async () => {
  const response = await axios.get('/api/reporting_years');
  return response.data;
};
