const { expect } = require("chai").use(require("chai-json-schema"));
const config = require("../config");
const { GET_USERS_DETAILS_ID } = require("./Schema/getdetailsuser.schema.json");
const { ERRORS } = require("./Schema/errors.schema.json");
const {
  getUserDetail,
  createNewUser,
  updateUserDetail,
} = require("./Pages/gorest");
const token = config.token;
let userId;

describe("Create and update user", function () {
  it("Failed create new user when mandatory param invalid", async function () {
    let newUser;
    //Create new users with empty name
    newUser = await createNewUser(token, "");
    expect(newUser.status).to.eql(200);
    expect(newUser.body.code).to.eql(422);
    expect(newUser.body).to.be.jsonSchema(ERRORS);
    expect(newUser.body.data[0].field).to.eql("name");
    expect(newUser.body.data[0].message).to.eql("can't be blank");

    //Create new users with invalid gender
    newUser = await createNewUser(token, undefined, "nothing");
    expect(newUser.status).to.eql(200);
    expect(newUser.body.code).to.eql(422);
    expect(newUser.body).to.be.jsonSchema(ERRORS);
    expect(newUser.body.data[0].field).to.eql("gender");
    expect(newUser.body.data[0].message).to.eql(
      "can't be blank, can be male of female"
    );

    //Create new users with empty email
    newUser = await createNewUser(token, undefined, undefined, "");
    expect(newUser.status).to.eql(200);
    expect(newUser.body.code).to.eql(422);
    expect(newUser.body).to.be.jsonSchema(ERRORS);
    expect(newUser.body.data[0].field).to.eql("email");
    expect(newUser.body.data[0].message).to.eql("can't be blank");
  });

  it("Successfully create new user", async function () {
    //Create new users
    const newUser = await createNewUser(token);
    expect(newUser.status).to.eql(200);
    expect(newUser.body.code).to.eql(201);
    expect(newUser.body.data.name).to.eql(newUser.request._data.name);
    expect(newUser.body.data.email).to.eql(newUser.request._data.email);
    expect(newUser.body.data.gender).to.eql(newUser.request._data.gender);
    userId = newUser.body.data.id;

    // check user's detail
    const userDetail = await getUserDetail(token, userId);
    expect(userDetail.status).to.eql(200);
    expect(userDetail.body).to.be.jsonSchema(GET_USERS_DETAILS_ID);
    expect(userDetail.body.data.name).to.eql(newUser.request._data.name);
    expect(userDetail.body.data.email).to.eql(newUser.request._data.email);
    expect(userDetail.body.data.gender).to.eql(newUser.request._data.gender);
    expect(userDetail.body.data.status).to.eql("active");
  });

  it("Successfully update user detail", async function () {
    // update user's detail
    const updateUser = await updateUserDetail(token, userId);
    expect(updateUser.status).to.eql(200);
    expect(updateUser.body.code).to.eql(200);
    expect(updateUser.body.data.name).to.eql(updateUser.request._data.name);
    expect(updateUser.body.data.email).to.eql(updateUser.request._data.email);

    // check user's detail
    const userDetail = await getUserDetail(token, userId);
    expect(userDetail.status).to.eql(200);
    expect(userDetail.body).to.be.jsonSchema(GET_USERS_DETAILS_ID);
    expect(userDetail.body.data.name).to.eql(updateUser.request._data.name);
    expect(userDetail.body.data.email).to.eql(updateUser.request._data.email);
    expect(userDetail.body.data.status).to.eql("active");
  });
});
