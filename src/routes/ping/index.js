import {Router as expressRouter } from "express";

const router = expressRouter();

const pingJSON = {
	success: true,
};

function pingRoute(_req, res){
	res.json(pingJSON);
}

router.get("/", pingRoute);

export default router;