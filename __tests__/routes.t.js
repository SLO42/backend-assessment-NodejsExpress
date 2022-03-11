/* eslint-disable no-undef */
import request from "supertest";
import app  from "../src/server.js";
import { writeJSONFile } from "../src/utility/util.js";

const exampleGoodTicket = {
	"ticketId": 5,
	"flightDate": "2000-01-01",
	"flightNumber": "AC1",
	"seatNumber": "1A",
	"ticketCost": 100000
};
const ticket2 = {
	"ticketId": 6,
	"flightDate": "2000-01-01",
	"flightNumber": "AC1",
	"seatNumber": "1A",
	"ticketCost": 100000
};
const ticket3 = {
	"ticketId": 8,
	"flightDate": "2000-01-01",
	"flightNumber": "AC1",
	"seatNumber": "1B",
	"ticketCost": 100000
};
const ticket4 = {
	"ticketId": 9,
	"flightDate": "2000-01-02",
	"flightNumber": "AC1",
	"seatNumber": "2A",
	"ticketCost": 100000
};

describe("(1): Testing Ticket Route", () => {
	test("(A): responds to Ticket @ /api/ticket", async () => {
		const res = await request(app)
			.post("/api/tickets")
			.send(exampleGoodTicket);
		expect(res.statusCode).toBe(200);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.text).toEqual("{\"status\":\"success\"}");
	});
	test("(B): responds to Ticket same id @ /ticket", async () => {
		const res = await request(app).post("/api/tickets").send(exampleGoodTicket);
		expect(res.statusCode).toBe(400);
		expect(res.text).toEqual("{\"status\":\"failed\",\"error\":\"ticketId already exists\"}");
	});
	test("(C): responds to Ticket same seat @ /ticket", async () => {
		const res = await request(app).post("/api/tickets").send(ticket2);
		expect(res.statusCode).toBe(400);
		expect(res.text).toEqual("{\"status\":\"failed\",\"error\":\"seatNumber already taken\"}");
	});
	test("(D): responds to Ticket @ /ticket", async () => {
		const res = await request(app).post("/api/tickets").send(ticket3);
		expect(res.statusCode).toBe(200);
		expect(res.text).toEqual("{\"status\":\"success\"}");
	});
	test("(E): responds to Ticket @ with changed date on same flight /ticket", async () => {
		const res = await request(app).post("/api/tickets").send(ticket4);
		expect(res.statusCode).toBe(200);
		expect(res.text).toEqual("{\"status\":\"success\"}");
	});
});

describe("(2): Testing Flight Route", () => {
	test("(A): responds  /api/flights", async () => {
		const res = await request(app).get("/api/flights")
			.query({startDate: "2000-01-01", endDate: "2000-01-02"});
		expect(res.statusCode).toBe(200);
	});
	test("(B): responds  /api/flights with proper query", async () => {
		const res = await request(app).get("/api/flights")
			.query({startDate: "2000-01-02", endDate: "2000-01-02"});
		expect(res.statusCode).toBe(200);
	});
	test("(C): responds  /api/flights with improper query ", async () => {
		const res = await request(app).get("/api/flights")
			.query({startDate: "2000-01-03", endDate: "2000-01-02"});
		expect(res.statusCode).toBe(400);
		expect(res.text).toEqual("{\"error\":\"endDate cannot be before startDate\"}");
	});
	test("(D): responds  /api/flights with improper query ", async () => {
		const res = await request(app).get("/api/flights")
			.query({startDate: "2000-1-01", endDate: "2000-01-02"});
		expect(res.statusCode).toBe(400);
		expect(res.text).toEqual("{\"error\":\"startDate format is invalid\"}");
	});
	test("(E): responds  /api/flights with improper query ", async () => {
		const res = await request(app).get("/api/flights")
			.query({startDate: "2000-01-01", endDate: "2000-1-02"});
		expect(res.statusCode).toBe(400);
		expect(res.text).toEqual("{\"error\":\"endDate format is invalid\"}");
	});
});

afterAll(() => {
	writeJSONFile("./src/data/tickets.json", []);
});