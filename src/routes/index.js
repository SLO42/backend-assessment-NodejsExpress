import { Router } from "express";
import TicketRoute from "./tickets/index.js";
import FlightRoute from "./flights/index.js";
import {validateTicketRequest, validateFlightsRequest} from "../middlewares/validators.js";

const router = Router();

router.use("/tickets", validateTicketRequest, TicketRoute);
router.use("/flights", validateFlightsRequest, FlightRoute);


export default router;