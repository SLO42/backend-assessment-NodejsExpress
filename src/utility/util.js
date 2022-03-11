import * as fs from "fs";

export const success = {"status": "success"};

export const writeJSONFile = (filename, content) => {
	fs.writeFileSync(filename, JSON.stringify(content), (err) => {
		if (err) {
			console.log(err);
		}
	});
};

export const datesBetween = (start, end) => {
	let indexDate = new Date(start);
	const endDate = new Date(end);
	let dates = [];
	while (indexDate <= endDate) {
		dates.push({date: indexDate.toISOString().substring(0, 10)});
		indexDate = new Date(indexDate.setDate(indexDate.getDate() + 1));
	}
	return dates;
};