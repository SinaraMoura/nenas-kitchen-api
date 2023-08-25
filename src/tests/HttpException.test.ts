import { HttpException } from "../interfaces/HttpException";
import { Response } from "express"
describe("HttpException", () => {
    it('should respond with the correct status and message HttpException', () => {
        const httpException: HttpException = {
            name: 'HttpException',
            status: 404,
            message: 'Not found'
        }
        new HttpException(httpException.status, httpException.message);

        expect(httpException.status).toEqual(404)
        expect(httpException.message).toEqual('Not found')
    })
})