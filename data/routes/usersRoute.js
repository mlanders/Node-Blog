const express = require('express');
const usersdb = require('../helpers/userDb');
const router = express.Router();

router.post('/', async (req, res) => {
	const { name } = req.body;
	const newUser = { name };

	try {
		const userId = await usersdb.insert(newUser);
		res.status(200).json({ success: true, userId });
	} catch {
		res.status(500).json({ success: false, message: `unable to create user` });
	}
});

router.get('/', async (req, res) => {
	try {
		const userList = await usersdb.get();
		res.status(200).json({ success: true, userList });
	} catch {
		res.status(500).json({ success: false, message: `can\'t get users` });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const userId = await usersdb.getById(req.params.id);
		res.status(200).json({ success: true, userId });
	} catch {
		res.status(500).json({ success: false, message: `can\'t get users` });
	}
});

router.get('/:id/posts', async (req, res) => {
	try {
		const userPosts = await usersdb.getUserPosts(req.params.id);
		res.status(200).json({ success: true, userPosts });
	} catch {
		res.status(500).json({ success: false, message: `can\'t get posts` });
	}
});

module.exports = router;
