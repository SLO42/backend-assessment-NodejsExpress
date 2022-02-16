import { Router as expressRouter } from "express";
import PingRoute from "./ping";

const router = expressRouter();

router.use("/ping", PingRoute);


export default router;