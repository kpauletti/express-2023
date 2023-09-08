import request from "supertest";
import app from "../app";

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get("/status/info").expect(200);
    });
});
