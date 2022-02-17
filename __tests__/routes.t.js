/* eslint-disable no-undef */
import request from "supertest";
import express from "express";
import router from "../src/routes";

const app = new express();
app.use("/", router);

expect.extend({
	toBeDistinct(received) {
		const pass = Array.isArray(received) && new Set(received).size === received.length;
		if (pass) {
			return {
				message: () => `expected [${received}] array is unique`,
				pass: true,
			};
		} else {
			return {
				message: () => `expected [${received}] array is not to unique`,
				pass: false,
			};
		}
	},
});


describe("(1): Testing Ping Route", () => {
	test("(default 1): responds to /api/ping", async () => {
		const res = await request(app).get("/ping");
		expect(res.statusCode).toBe(200);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.text).toEqual("{\"success\":true}");
	});
});

describe("(2): Testing Post Route", () => {
	
	test("(error 1): responds to /api/post with no tags", async () => {
		const res = await request(app).get("/posts");
		expect(res.statusCode).toBe(400);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.text).toEqual("{\"error\":\"Tags parameter is required\"}");
	});

	test("(error 2): responds to /api/post?tags=tech with invalid sortBy", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=bad");
		expect(res.statusCode).toBe(400);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.text).toEqual("{\"error\":\"sortBy parameter is invalid\"}");
	});

	test("(error 3): responds to /api/post?tags=tech with invalid direction", async () => {
		const res = await request(app).get("/posts?tags=tech&direction=bad");
		expect(res.statusCode).toBe(400);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(res.text).toEqual("{\"error\":\"direction parameter is invalid\"}");
	});

	test("(error 4): responds to /api/post?tags=", async () => {
		const res = await request(app).get("/posts?tags=");

		expect(res.statusCode).toBe(400);
		expect(res.text).toEqual("{\"error\":\"Tags parameter is required\"}");
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});
	
	test("(default): responds to /api/post?tags=tech", async () => {
		const res = await request(app).get("/posts?tags=tech");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].id).toBeLessThanOrEqual(posts[1].id);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});
	
	test("(default asc): responds to /api/post?tags=tech | direction asc", async () => {
		const res = await request(app).get("/posts?tags=tech&direction=asc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].id).toBeLessThanOrEqual(posts[1].id);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(default desc): responds to /api/post?tags=tech | direction desc", async () => {
		const res = await request(app).get("/posts?tags=tech&direction=desc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].id).toBeGreaterThanOrEqual(posts[1].id);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(reads): responds to /api/post?tags=tech | sortBy reads", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=reads");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].reads).toBeLessThanOrEqual(posts[1].reads);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(reads asc): responds to /api/post?tags=tech | sortBy reads | direction asc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=reads&direction=asc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].reads).toBeLessThanOrEqual(posts[1].reads);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(reads desc): responds to /api/post?tags=tech | sortBy reads | direction desc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=reads&direction=desc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].reads).toBeGreaterThanOrEqual(posts[1].reads);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(likes): responds to /api/post?tags=tech | sortBy likes", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=likes");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].likes).toBeLessThanOrEqual(posts[1].likes);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(likes asc): responds to /api/post?tags=tech | sortBy likes | direction asc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=likes&direction=asc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].likes).toBeLessThanOrEqual(posts[1].likes);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(likes desc): responds to /api/post?tags=tech | sortBy likes | direction desc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=likes&direction=desc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].likes).toBeGreaterThanOrEqual(posts[1].likes);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(popularity): responds to /api/post?tags=tech | sortBy popularity", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=popularity");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].popularity).toBeLessThanOrEqual(posts[1].popularity);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(popularity asc): responds to /api/post?tags=tech | sortBy popularity | direction asc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=popularity&direction=asc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].popularity).toBeLessThanOrEqual(posts[1].popularity);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	
	test("(popularity desc): responds to /api/post?tags=tech | sortBy popularity | direction desc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=popularity&direction=desc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].popularity).toBeGreaterThanOrEqual(posts[1].popularity);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(id): responds to /api/post?tags=tech | sortBy id", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=id");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].id).toBeLessThanOrEqual(posts[1].id);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(id asc): responds to /api/post?tags=tech | sortBy id | direction asc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=id&direction=asc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].id).toBeLessThanOrEqual(posts[1].id);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(id desc): responds to /api/post?tags=tech | sortBy id | direction desc", async () => {
		const res = await request(app).get("/posts?tags=tech&sortBy=id&direction=desc");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts[0].id).toBeGreaterThanOrEqual(posts[1].id);
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});
});

describe("(3): Testing Post Route for duplicates", () => { 

	test("(tech and science): responds to /api/post?tags=tech,science", async () => {
		const res = await request(app).get("/posts?tags=tech,science");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts).toBeDistinct();
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});

	test("(history and science): responds to /api/post?tags=history,science", async () => {
		const res = await request(app).get("/posts?tags=history,science");

		expect(res.statusCode).toBe(200);
		const posts = (JSON.parse(res.text)).posts;
		expect(posts).toBeDistinct();
		expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
	});
});
