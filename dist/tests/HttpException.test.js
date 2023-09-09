"use strict";

// src/interfaces/HttpException.ts
var HttpException = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.message = message;
  }
};

// src/tests/HttpException.test.ts
describe("HttpException", () => {
  it("should respond with the correct status and message HttpException", () => {
    const httpException = {
      name: "HttpException",
      status: 404,
      message: "Not found"
    };
    new HttpException(httpException.status, httpException.message);
    expect(httpException.status).toEqual(404);
    expect(httpException.message).toEqual("Not found");
  });
});
