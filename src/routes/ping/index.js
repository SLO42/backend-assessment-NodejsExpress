import {Router as expressRouter } from "express";

const router = expressRouter();

const pingJSON = {
	success: true,
};

router.get("/", (req, res) => {
	res.json(pingJSON);
});

export default router;