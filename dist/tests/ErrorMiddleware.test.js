"use strict";

// src/middlewares/error.middlewares.ts
function errorMiddleware(err, req, res, next) {
  const status = err.status ?? 500;
  const message = err.message ?? "Internal server error";
  res.status(status).json({
    status,
    message
  });
}

// src/tests/ErrorMiddleware.test.ts
describe("Error Middleware", () => {
  it("should respond with the correct status and message HttpException", () => {
    const httpException = {
      name: "HttpException",
      status: 404,
      message: "Not found"
    };
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
    errorMiddleware(httpException, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 404,
      message: "Not found"
    });
  });
});
