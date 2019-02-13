const express = require('express');
const postdb = require('../helpers/postDb');
const router = express.Router();

//Get all posts
router.get('/', async (req, res) => {
	try {
		const posts = await postdb.get();
		res.status(200).json({ posts });
	} catch {
		res.status(500).json({ message: `unable to retrieve all posts` });
	}
});

//Add new post
router.post('/', async (req, res) => {
	const { user_id, text } = req.body;
	const newPost = { user_id, text };
	try {
		const post = await postdb.insert(newPost);
		res.status(201).json({ post });
	} catch {
		res.status(500).json({ message: `unable to retrieve all posts` });
	}
});
module.exports = router;
