export const parseErrors = (error) => {
  // check if error is a validation error
  //the question marks in Ln4 indicates the process will cease if an affirmative response isn't achieved at the respective stage.
  if (error?.response?.data.error?.name === "ValidationError") {
    return {
      message: error.response.data.error.message,
      details: error.response.data.error.details.errors,
    };
  }

  // check if it is a network error
  if (error?.message === "Network Error") {
    return {
      message: "Unable to connect to the server endpoint provided",
      details: [],
    };
  }

  // check for forbidden error
  if (error?.response?.status === 403) {
    return {
      message: "Your role does not have access to this resource",
      details: [],
    };
  }

  // check for generic error
  return {
    message: "An unexpected error occured. Contact Support.",
    details: [],
  };
};
