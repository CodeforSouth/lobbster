import axios from 'axios';

export const fetchDisclosures = async (lobbyistId, reportingYear) => {
  const response = await axios.post('/api/disclosure/fetch', {
    params: {
      lobbyistId,
      reportingYear
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
  principalAddress,
  principalPhoneNumber,
  lobbyistBusinessName,
  lobbyistBusinessAddress,
  lobbyistBusinessPhoneNumber,
  issues
) => {
  const response = await axios.post(
    '/api/disclosure/create',
    {
      params: {
        lobbyistId,
        reportingYear,
        principalName,
        principalAddress,
        principalPhoneNumber,
        lobbyistBusinessName,
        lobbyistBusinessAddress,
        lobbyistBusinessPhoneNumber,
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
  principalAddress,
  principalPhoneNumber,
  lobbyistBusinessName,
  lobbyistBusinessAddress,
  lobbyistBusinessPhoneNumber,
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
        principalAddress,
        principalPhoneNumber,
        lobbyistBusinessName,
        lobbyistBusinessAddress,
        lobbyistBusinessPhoneNumber,
        issues
      }
    }
  );
  return response.data;
};

export const deleteDisclosure = async () => { };
