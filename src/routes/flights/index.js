import { Router } from "express";
import { validationResult } from "express-validator";
import { getTickets } from "../../data/ticket_api.js";
import { datesBetween } from "../../utility/util.js";

const router = Router();

const sortAlphaNum = (a, b) => a.localeCompare(b, "en", { numeric: true });


router.get("/", async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: (errors.array())[0].msg });
	}

	const {startDate, endDate} = req.query;

	const filteredTickets = getTickets(startDate, endDate);

	// let dates = 
	let sums = {};
	let seats = {};
	let flightObjs = {};
	let flights = datesBetween(startDate, endDate);

	for (const ticket of filteredTickets) {
		for (const flight of flights){
			if (ticket.flightDate === flight.date) {
				const key = `${flight.date}|${ticket.flightNumber}`;
				if (sums[key] && seats[key]){
					sums[key] += ticket.ticketCost;
					let seatArray = seats[key];
					seatArray.push(ticket.seatNumber);
					flightObjs[key] = {
						flightNumber: ticket.flightNumber,
						revenue: sums[key],
						occupiedSeats: seats[key]
					};
				} else {
					sums[key] = ticket.ticketCost;
					seats[key] = [];
					seats[key].push(ticket.seatNumber);
					const flightObj = {
						flightNumber: ticket.flightNumber,
						revenue: sums[key],
						occupiedSeats: seats[key]
					};
					flightObjs[key] = flightObj;
				}
			}
		}
	}
	

	flights.map((_value, index) => {
		flights[index].flights = [];
	});	

	Object.keys(flightObjs).map((key) => {
		const date = key.slice(0, 10);
		const flightNumber = key.slice(11);
		console.log(date,flightNumber);
		const index = flights.findIndex(e => e.date === date);
		flightObjs[key].occupiedSeats = flightObjs[key].occupiedSeats.sort(sortAlphaNum);
		flights[index].flights.push({  ...flightObjs[key]});
	});
	const result = {dates: flights};
	console.log(result);
	res.status(200).json(result);
});

export default router;