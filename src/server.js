import express from "express";
// import axios from "axios";
import api from "./routes";

// const getBlogsFromTag = async (tag) => {
// 	const dataSource = await axios.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
// 		.then((data) => {
// 			return data.data;
// 		})
// 		.catch(error => console.log(error));
// 	return dataSource;
// };

const app = express();
const port = 80;

app.use("/api", api);

app.listen(port);
