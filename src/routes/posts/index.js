import {Router as expressRouter } from "express";
import axios from "axios";
import { validationResult } from "express-validator";
import { hatchwaysBaseURL } from "../../config/hatchways";

const router = expressRouter();

const sortPostsBy = (posts, sortBy, direction) => {  
	if (!direction){
		direction = "asc";
	}
	const isAscending = direction === "asc";

	switch (sortBy) {
	case "reads":
		return posts.sort((a, b) => isAscending ? (a.reads < b.reads) ? -1 : 1 : (a.reads < b.reads) ? 1 : -1 );
	case "likes":
		return posts.sort((a, b) => isAscending ? (a.likes < b.likes) ? -1 : 1 : (a.likes < b.likes) ? 1 : -1 );
	case "popularity":
		return posts.sort((a, b) => isAscending ? (a.popularity < b.popularity) ? -1 : 1 : (a.popularity < b.popularity) ? 1 : -1 );
	default:
		return posts.sort((a, b) => isAscending ? (a.id < b.id) ? -1 : 1 : (a.id < b.id) ? 1 : -1 );
	}
};

router.get("/", (req, res) => {
	const {tags, sortBy, direction} = req.query;
	
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ error: (errors.array())[0].msg });
	}

	// soft check for tags...
	if (!tags) {
		res.send("please enter a valid tag");
	} else {
		const tagsArray = tags.split(",");
		const endpoints = tagsArray.map(tag => `${hatchwaysBaseURL}?tag=${tag}`);

		Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
			axios.spread(( ...data  ) => { 
				const seen = new Set();
				const posts = (data.map((item) => item.data.posts)).flat(2);
				const filteredPosts = posts.filter((post) => { 
					const duplicate = seen.has(post.id);
					seen.add(post.id);
					return !duplicate;
				});
				res.send({posts: sortPostsBy(filteredPosts, sortBy, direction)});
			})
		);
	}
});

export default router;