const config = require("../../config");
const {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} = require("../../Helper/base-api");
const baseUrl = config.apiBaseUrl;
const {
  generateGender,
  generateRegEmail,
  generateString,
} = require("../../Helper/data-generator");
module.exports = {
  createNewUser: async (token, names, genders, emails) => {
    const name =
      names !== null && names !== undefined ? names : await generateString(5);
    const gender =
      genders !== null && genders !== undefined
        ? genders
        : await generateGender();
    const email =
      emails !== null && emails !== undefined
        ? emails
        : await generateRegEmail();

    const response = await postRequest(
      baseUrl,
      "",
      {
        name,
        gender,
        email,
        status: "active",
      },
      { Authorization: `Bearer ${token}` }
    );
    return response;
  },
  getUserDetail: async (token, id) => {
    const url = id != undefined ? `${baseUrl}/${id}` : baseUrl;
    const response = await getRequest(url, "", {
      Authorization: `Bearer ${token}`,
    });
    return response;
  },
  updateUserDetail: async (token, id) => {
    const response = await putRequest(
      baseUrl,
      `/${id}`,
      {
        name: await generateString(5),
        email: await generateRegEmail(),
        status: "active",
      },
      { Authorization: `Bearer ${token}` }
    );
    return response;
  },
  deleteUsers: async (token, id) => {
    const response = await deleteRequest(
      baseUrl,
      `/${id}`,
      {
        query: `mutation{deleteUser(input: {id:${id} }){user {id name email gender status}}}`,
      },
      { Authorization: `Bearer ${token}` }
    );
    return response;
  },
};
