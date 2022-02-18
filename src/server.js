import express from "express";
import api from "./routes";

const app = express();
const port = 80;

app.use("/api", api);

app.listen(port);
