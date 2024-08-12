const { expect } = require("chai").use(require("chai-json-schema"));
const config = require("../config");
const { GET_USERS_DETAILS } = require("./Schema/getdetails.schema.json");
const { GET_USERS_DETAILS_ID } = require("./Schema/getdetailsuser.schema.json");
const { ERRORS } = require("./Schema/errors.schema.json");
const { getUserDetail } = require("./Pages/gorest");
const token = config.token;
let userId;
describe("Get user detail", function () {
  it("Successfully get user details without id", async function () {
    const userDetail = await getUserDetail(token, "");
    expect(userDetail.status).to.eql(200);
    expect(userDetail.body).to.be.jsonSchema(GET_USERS_DETAILS);
    userId = userDetail.body.data[0].id;
  });

  it("Successfully get user details with correct id", async function () {
    const userDetail = await getUserDetail(token, userId);
    expect(userDetail.status).to.eql(200);
    expect(userDetail.body).to.be.jsonSchema(GET_USERS_DETAILS_ID);
  });

  it("Failed to get user details with incorrect id", async function () {
    const userDetail = await getUserDetail(token, 122);
    expect(userDetail.status).to.eql(200);
    expect(userDetail.body).to.be.jsonSchema(ERRORS);
    expect(userDetail.body.code).to.eql(404);
    expect(userDetail.body.data.message).to.eql("Resource not found");
  });
});
