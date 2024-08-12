const { throwError } = require("./base-api");

exports.mochaHooks = {
  afterEach: function () {
    if (this.currentTest.state !== "passed" && global.details != undefined) {
      throwError(this.currentTest.err, global.details);
    }
  },
};
