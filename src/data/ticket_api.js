import { createRequire } from "module";
import {writeJSONFile } from "../utility/util.js";

const fileName = "./tickets.json";
const require = createRequire(import.meta.url);


/** @type {Array} */
let tickets;
try {
	tickets = await require(fileName);
} catch {
	writeJSONFile("./src/data/tickets.json", []);
}

/**
 *  finds ticket with id.
 * @param {number} ticketId - ticketId
 * @return 
 */
export const findIdInTickets = async (ticketId) => {
	for (let ticket of tickets){
		if (ticket.ticketId === ticketId) return true;
	}
	return false;
};

/**
 *  filters tickets by flight number.
 * @param {string} flightNumber 
 * @return 
 */
export const filterTicketsByFlightNumber = async (flightNumber) => {
	const filteredTickets = tickets.filter(element => {
		if (element.flightNumber === flightNumber){
			return element;
		}
	});
	return filteredTickets;
};


/**
 * 
 * checks flight for seat number
 * @param {string} seatNumber 
 * @param {string} flightNumber
 * @return {boolean} - true if found. false if not.
 */
export const findSeatWithFlightNumber = async (seatNumber, flightNumber) => {
	for (const ticket of (await filterTicketsByFlightNumber(flightNumber))){
		if (ticket.seatNumber === seatNumber){
			return true;
		}
	}
	return false;
};

/**
 * 
 * Get Tickets route
 * @param {string} startDate - ex: "2001-01-02"
 * @param {string} endDate - ex: "2001-01-05"
 * @return {Array<object>} array of tickets within start and end date
 */
export const getTickets = (startDate, endDate) => {

	function isWithinDates(flightDate){
		if (flightDate >= startDate && flightDate <= endDate)
			return true;
		return false;
	}

	const filteredTickets = tickets.filter((ticket) => isWithinDates(ticket.flightDate));

	return filteredTickets;
};

/**
 * 	UpdateTickets : 
 *  checks to see if other tickets with same flight need to change dates.
 *  added new ticket to array and writes to file.
 * @param {object} newTicket 
 */
const updateTickets = (newTicket) => {
	tickets.forEach((ticket, index) => {
		if (ticket.flightNumber !== newTicket.flightNumber) return;
		else if (ticket.flightDate !== newTicket.flightDate){
			tickets[index].flightDate = newTicket.flightDate;
		}
	});
	tickets.push(newTicket);
	writeJSONFile("./src/data/tickets.json", tickets);
};

/**
 * 	add ticket to array of tickets. 
 * @param {object} newTicket 
 */
export const addTicket = async (newTicket) => {
	updateTickets(newTicket);
};

/**
 *  Create new ticket
 *	takes Request.body and transforms that data into a new ticket
 * @param {object} body 
 * @return 
 */
export const newTicket = (body) => {
	const { ticketId,
		flightDate,
		flightNumber,
		seatNumber,
		ticketCost
	} = body;
	return { ticketId, flightDate, flightNumber, seatNumber, ticketCost };
};