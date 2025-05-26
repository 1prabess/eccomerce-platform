import { getReasonPhrase } from "http-status-codes";

function responseFormatter(req, res, next) {
  const originalJson = res.json;

  res.json = (data) => {
    const response = {
      status:
        res.statusCode >= 200 && res.statusCode < 300 ? "success" : "error",
      statusCode: res.statusCode,
      statusMessage: getReasonPhrase(res.statusCode),
    };

    // Pull top-level message if present
    if (data?.message) {
      response.message = data.message;
    }

    // Remove nested message from data or error
    if (data?.data?.message) {
      delete data.data.message;
    }
    if (data?.error?.message) {
      delete data.error.message;
    }

    // Handle success
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const responseData = data?.data ?? data;

      // Remove top-level message from here too
      if (responseData?.message) delete responseData.message;

      if (
        responseData &&
        !(
          typeof responseData === "object" &&
          Object.keys(responseData).length === 0
        )
      ) {
        response.data = responseData;
      }
    }

    // Handle error
    if (res.statusCode >= 400) {
      const errorData = data?.error ?? data;

      // Remove top-level message from here too
      if (errorData?.message) delete errorData.message;

      if (
        errorData &&
        !(typeof errorData === "object" && Object.keys(errorData).length === 0)
      ) {
        response.error = errorData;
      }
    }

    // Add pagination if available
    if (data?.pagination) {
      response.pagination = data.pagination;
    }

    originalJson.call(res, response);
  };

  next();
}

export default responseFormatter;
