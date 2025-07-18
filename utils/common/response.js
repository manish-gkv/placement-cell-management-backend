export const internalErrorResponse = (error) => {
  return {
    success: false,
    err: error,
    message: 'Internal server error'
  };
};

export const customErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalErrorResponse(error);
  }
  return {
    success: false,
    err: error.explanation,
    message: error.message
  };
};

export const successResponse = (data, message) => {
  return {
    success: true,
    message,
    data,
  };
};