export const success = (status, data) => {
  return {
    result: 'Success',
    status,
    success: data,
    error: null,
  };
};

export const failure = (status, errorCode, message) => {
  return {
    result: 'Fail',
    status,
    success: null,
    error: {
      errorCode,
      message,
    },
  };
};