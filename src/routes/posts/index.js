import {Router as expressRouter } from "express";

const router = expressRouter();

// add middlewear check for 
// tags (required Array<string>) default (N/A)
// sortBy (string: id | reads | likes | popularity) default (id)
// direction (string: desc | asc) default (asc)

router.get("/", (req, res) => {
    const {tags, sortBy, direction} = req.query;

    // soft check for tags...
    if (!tags) {
        res.send("please enter a valid tag");
    }

	res.json(pingJSON);
});

export default router;