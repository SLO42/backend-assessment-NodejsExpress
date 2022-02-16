import { Router as expressRouter } from "express";
import PingRoute from "./ping";
import PostsRoute from "./posts";

const router = expressRouter();

router.use("/ping", PingRoute);
router.use("/posts", PostsRoute);


export default router;