import axios from 'axios';

export const fetchDisclosures = async (lobbyistId, reportingYear, principal) => {
  const response = await axios.post('/api/disclosure/fetch', {
    params: {
      lobbyistId,
      reportingYear,
      principal
    }
  });
  return response.data;
};

export const fetchDisclosure = async (disclosureId) => {
  const response = await axios.post(
    '/api/disclosure/fetchById', {
      params: {
        disclosureId
      }
    }
  );
  return response.data;
};

export const createNewDisclosure = async (
  lobbyistId,
  reportingYear,
  principalName,
  feeWaver,
  issues
) => {
  const response = await axios.post(
    '/api/disclosure/create',
    {
      params: {
        lobbyistId,
        reportingYear,
        principalName,
        feeWaver,
        issues
      }
    }
  );
  return response.data;
};

export const modifyDisclosure = async (
  disclosureId,
  lobbyistId,
  reportingYear,
  principalName,
  feeWaver,
  issues
) => {
  const response = await axios.post(
    '/api/disclosure/modify_disclosure',
    {
      params: {
        disclosureId,
        lobbyistId,
        reportingYear,
        principalName,
        feeWaver,
        issues
      }
    }
  );
  return response.data;
};

export const deleteDisclosure = async () => { };
