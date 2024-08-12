const { expect } = require("chai").use(require("chai-json-schema"));
const config = require("../config");
const { ERRORS } = require("./Schema/errors.schema.json");
const { GET_USERS_DETAILS_ID } = require("./Schema/getdetailsuser.schema.json");
const { getUserDetail, createNewUser, deleteUsers } = require("./Pages/gorest");
const token = config.token;
let userId;

describe("Delete User", function () {
  before(async () => {
    const newUser = await createNewUser(token);
    expect(newUser.status).to.eql(200);
    expect(newUser.body.code).to.eql(201);
    userId = newUser.body.data.id;
  });

  it("Successfully delete user", async function () {
    //get user's detail before delete
    const initialUserDetail = await getUserDetail(token, userId);
    expect(initialUserDetail.status).to.eql(200);
    expect(initialUserDetail.body).to.be.jsonSchema(GET_USERS_DETAILS_ID);

    //delete user
    const deleteUser = await deleteUsers(token, userId);
    expect(deleteUser.status).to.eql(200);
    expect(deleteUser.body.code).to.eql(204);

    //get user's detail after delete
    const finalUserDetail = await getUserDetail(token, userId);
    expect(finalUserDetail.status).to.eql(200);
    expect(finalUserDetail.body.code).to.eql(404);
    expect(finalUserDetail.body).to.be.jsonSchema(ERRORS);
  });

  it("Failed delete non existent user", async function () {
    //get user's detail before delete
    const userDetail = await getUserDetail(token, userId);
    expect(userDetail.status).to.eql(200);
    expect(userDetail.body.code).to.eql(404);
    expect(userDetail.body).to.be.jsonSchema(ERRORS);

    //delete user
    const deleteUser = await deleteUsers(token, userId);
    expect(deleteUser.status).to.eql(200);
    expect(deleteUser.body.code).to.eql(404);
    expect(userDetail.body).to.be.jsonSchema(ERRORS);
    expect(userDetail.body.data.message).to.eql("Resource not found");
  });
});
