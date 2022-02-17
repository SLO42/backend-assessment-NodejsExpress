import { query } from "express-validator";

const sortByValues = ["id", "reads", "likes", "popularity"];
const directionValues = ["asc", "desc"];

export const validatePostRequest = [
	query("tags", "Tags parameter is required").notEmpty(),
	query("sortBy", "sortBy parameter is invalid").optional().isIn(sortByValues),
	query("direction", "direction parameter is invalid").optional().isIn(directionValues),
];