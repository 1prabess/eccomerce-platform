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

    if (res.statusCode >= 200 && res.statusCode < 300) {
      const responseData = data.data ? data.data : data;
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

    if (res.statusCode > 300) {
      if (
        data &&
        !(typeof data === "object" && Object.keys(data).length === 0)
      ) {
        response.error = data;
      }
    }

    if (data.pagination) {
      response.pagination = data.pagination;
    }

    originalJson.call(res, response);
  };

  next();
}

export default responseFormatter;
