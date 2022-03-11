/* eslint-disable no-undef */
import request from "supertest";
import express from "express";
import router from "../src/routes";

const app = new express();
app.use("/", router);


describe("(1): Testing Ticket Route", () => {
	test("(A): responds to /api/ticket", async () => {
		const res = await request(app).post("/ticket");
		expect(res.statusCode).toBe(200);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.text).toEqual("{\"success\":true}");
	});
});
