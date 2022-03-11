import { Router } from "express";
import { validationResult } from "express-validator";
import { addTicket } from "../../data/ticket_api.js";
import { success } from "../../utility/util.js";
const router = Router();

export const newTicket = (body) => {
	const { ticketId,
		flightDate,
		flightNumber,
		seatNumber,
		ticketCost
	} = body;
	return { ticketId, flightDate, flightNumber, seatNumber, ticketCost };
};

async function ticketRoute(req, res){
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// return res.status(400).json({ status: "failed", errors: errors.array() });
		return res.status(400).json({ status: "failed", error: (errors.array())[0].msg });
	}
	await addTicket(newTicket(req.body));
	res.status(200).json(success);
}

router.post("/", ticketRoute);

export default router;