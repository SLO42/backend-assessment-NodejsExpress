import {Router as expressRouter } from "express";
import axios from "axios";

const router = expressRouter();

// add middlewear check for 
// tags (required Array<string>) default (N/A)
// sortBy (string: id | reads | likes | popularity) default (id)
// direction (string: desc | asc) default (asc)

//let endpoints = [
//     'https://api.github.com/users/ejirocodes',
//     'https://api.github.com/users/ejirocodes/repos',
//     'https://api.github.com/users/ejirocodes/followers',
//     'https://api.github.com/users/ejirocodes/following'
//   ];

const isAscending = (direction) => direction === "asc";

const sortPostsBy = (posts, sortBy, direction) => {
	if (!direction){
		direction = "asc";
	}
	const isAsc = isAscending(direction);
	switch (sortBy) {
	case "reads":
		return posts.sort((a, b) => (a.reads < b.reads) ? (isAsc ? -1 : 1) : (isAsc ? 1 : -1));
	case "likes":
		return posts.sort((a, b) => (a.likes < b.likes) ? (isAsc ? -1 : 1) : (isAsc ? 1 : -1));
	case "popularity":
		return posts.sort((a, b) => (a.popularity < b.popularity) ? (isAsc ? -1 : 1) : (isAsc ? 1 : -1));
	default:
		return posts.sort((a, b) => (a.id < b.id) ? (isAsc ? -1 : 1) : (isAsc ? 1 : -1));
	}
};


const tagsToEndpoint = (tag) => `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`;

router.get("/", (req, res) => {
	const {tags, sortBy, direction} = req.query;

	// soft check for tags...
	if (!tags) {
		res.send("please enter a valid tag");
	} else {
		const tagsArray = tags.split(",");
		const endpoints = tagsArray.map(tag => tagsToEndpoint(tag));

		Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
			axios.spread(( ...data  ) => { 
				const seen = new Set();
				const posts = (data.map((item) => item.data.posts)).flat(2);
				const filteredPosts = posts.filter((post) => { 
					const duplicate = seen.has(post.id);
					seen.add(post.id);
					return !duplicate;
				});
				console.log(filteredPosts.length);
				res.send({posts: sortPostsBy(filteredPosts, sortBy, direction)});
			})
		);
	}
});

export default router;