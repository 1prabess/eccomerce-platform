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

    // Promote and remove pagination from nested data
    let pagination;
    if (data?.data?.pagination) {
      pagination = data.data.pagination;
      delete data.data.pagination;
    } else if (data?.pagination) {
      pagination = data.pagination;
    }

    // Handle success
    if (res.statusCode >= 200 && res.statusCode < 300) {
      const responseData = data?.data ?? data;

      // Remove any leftover message or pagination
      if (responseData?.message) delete responseData.message;
      if (responseData?.pagination) delete responseData.pagination;

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

      if (errorData?.message) delete errorData.message;

      if (
        errorData &&
        !(typeof errorData === "object" && Object.keys(errorData).length === 0)
      ) {
        response.error = errorData;
      }
    }

    // Final pagination assignment (once, top-level only)
    if (pagination) {
      response.pagination = pagination;
    }

    originalJson.call(res, response);
  };

  next();
}

export default responseFormatter;
