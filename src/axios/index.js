import axios from "axios";
import { hatchwaysBaseURL } from "../config/hatchways";

const now = new Date().toUTCString;

export const hatchwayInstance = axios.create({
	baseURL: hatchwaysBaseURL,
	timeout: 10000,
	headers: {"Cache-Control":"public", "max-age": 300, "Last-Modified": now}
});