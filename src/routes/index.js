import { Router as expressRouter } from "express";
import PingRoute from "./ping";
import PostsRoute from "./posts";
import {validatePostRequest} from "../middlewares/postsValidators";
const router = expressRouter();



router.use("/ping", PingRoute);
router.use("/posts", validatePostRequest, PostsRoute);


export default router;