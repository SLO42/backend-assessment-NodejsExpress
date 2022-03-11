import express from "express";
import ApiRoutes from "./routes/index.js";

const app = express();
const port = 80;
app.use(express.json());

app.use("/api", ApiRoutes);

app.listen(port);
