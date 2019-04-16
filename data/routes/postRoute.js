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
//Get post by id
router.get('/:id', async (req, res) => {
	const id = req.params.id;

	try {
		const post = await postdb.getById(id);
		if (post) {
			res.status(200).json({ post });
		} else {
			res.status(404).json({ message: "That post doesn't exist" });
		}
	} catch {
		res.status(500).json({ message: `Error on the server. Please try again` });
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

// update post
router.put('/:id', async (req, res) => {
	try {
		const { user_id, text } = req.body;
		const changes = { user_id, text };
		const id = req.params.id;
		if (!user_id || !text) {
			res.status(400).json({ message: 'Please provide user ID and text' });
		} else {
			const postID = await postdb.getById(id);
			if (postID) {
				const updatedPost = await postdb.update(id, changes);
				res.status(200).json({ successfull: true, updatedPost });
			} else {
				res.status(404).json({ message: `unable to find that post` });
			}
		}
	} catch {
		res.status(500).json({ message: 'server error' });
	}
});

//delete post
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const postID = await postdb.getById(id);
		if (postID) {
			const deletedPost = await postdb.remove(id);
			res.status(200).json({ successfull: true });
		} else {
			res.status(404).json({ successfull: false, message: 'post does not exist' });
		}
	} catch {
		res.status(500).json({ message: `unable to delete post` });
	}
});

module.exports = router;
