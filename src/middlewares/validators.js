import { body, query } from "express-validator";
import { findSeatWithFlightNumber, findIdInTickets } from "../data/ticket_api.js";

const FAILED_BY_TICKET_ID_EXISTS = "ticketId already exists";
const FAILED_BY_TICKET_ID_REQUIRED = "ticketId is required";
const FAILED_BY_SEAT_NUMBER_EXISTS = "seatNumber already taken";
const FAILED_BY_SEAT_NUMBER_REQUIRED = "seatNumber is required";
const FAILED_BY_FLIGHT_NUMBER_REQUIRED = "flightNumber is required";
const FAILED_BY_START_DATE_BAD_FORMAT = "startDate format is invalid";
const FAILED_BY_START_DATE_REQUIRED = "startDate is empty";
const FAILED_BY_END_DATE_REQUIRED = "endDate is empty";
const FAILED_BY_END_DATE_BAD_FORMAT = "endDate format is invalid";
const FAILED_BY_END_DATE_BEFORE_START = "endDate cannot be before startDate";

export const validateTicketRequest = [
	body("ticketId").custom(async (val) => {
		const value = val.toString();
		if ( value ) {
			const found = await findIdInTickets(val);
			if (found){
				return Promise.reject(FAILED_BY_TICKET_ID_EXISTS);
			}
		} else {
			if (!value){
				return Promise.reject(FAILED_BY_TICKET_ID_REQUIRED);
			}
		}
		return true;
	}),
	body("seatNumber").custom(async (val, { req }) => {
		if (val && req.body.flightNumber){
			const found = await findSeatWithFlightNumber(val, req.body.flightNumber);
			if (found) {
				return Promise.reject(FAILED_BY_SEAT_NUMBER_EXISTS);
			}
			return true;
		}
		if (!val) return Promise.reject(FAILED_BY_SEAT_NUMBER_REQUIRED);
		return Promise.reject(FAILED_BY_FLIGHT_NUMBER_REQUIRED);
	})
];

const re = new RegExp("\\d{4}[-]\\d{2}[-]\\d{2}");
export const validateFlightsRequest = [
	query("startDate").custom(val => {
		if (val && typeof val === "string") {
			const result = re.test(val);
			if (!result) return Promise.reject(FAILED_BY_START_DATE_BAD_FORMAT);
			return result;
		}
		else {
			return Promise.reject(FAILED_BY_START_DATE_REQUIRED);
		}
	}),
	query("endDate").custom((val, { req }) => {
		if (val && typeof val === "string") {
			const result = re.test(val);
			if (!result) return Promise.reject(FAILED_BY_END_DATE_BAD_FORMAT);
			if (req.query.startDate <= val){
				return true;
			} else return Promise.reject(FAILED_BY_END_DATE_BEFORE_START);
		}
		else {
			return Promise.reject(FAILED_BY_END_DATE_REQUIRED);
		}
	}),
];