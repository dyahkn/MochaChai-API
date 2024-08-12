const request = require("supertest");
module.exports = {
  postRequest: async (url, endpoint, body, header) => {
    const response = await request(url).post(endpoint).set(header).send(body);
    global.details = response;
    return response;
  },
  getRequest: async (url, endpoint, header, params) => {
    const response = await request(url).get(endpoint).query(params).set(header);
    global.details = response;
    return response;
  },
  putRequest: async (url, endpoint, body, header) => {
    const response = await request(url).put(endpoint).set(header).send(body);
    global.details = response;
    return response;
  },
  deleteRequest: async (url, endpoint, body, header) => {
    const response = await request(url).delete(endpoint).set(header).send(body);
    global.details = response;
    return response;
  },
  throwError: async (err, response) => {
    const originalError = err;
    let detailsErrorMsg = "";

    //Add error's detail
    detailsErrorMsg += `\nRequest Url: ${response.request.method} ${response.request.url}\n`;
    detailsErrorMsg += `\nRequest Header: ${JSON.stringify(response.request.header)}\n`;

    if (response.request._data !== undefined) {
      detailsErrorMsg += `\nRequest Body: ${JSON.stringify(response.request._data)}\n`;
    }
    if (Object.keys(response.body).length === 0) {
      detailsErrorMsg += `\nResponse Text: ${JSON.stringify(response.text)}\n`;
    } else {
      detailsErrorMsg += `\nResponse Body: ${JSON.stringify(response.body)}\n`;
    }

    //Append error message
    originalError.message += `\n${detailsErrorMsg}`;
    err = originalError;
    return err;
  },
};
