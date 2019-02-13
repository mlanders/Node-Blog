const express = require('express');
const usersdb = require('../helpers/userDb');
const router = express.Router();

// Create new user
router.post('/', async (req, res) => {
	const { name } = req.body;
	const newUser = { name };

	try {
		const userId = await usersdb.insert(newUser);
		res.status(201).json({ success: true, userId });
	} catch {
		res.status(500).json({ success: false, message: `unable to create user` });
	}
});

//Get all users
router.get('/', async (req, res) => {
	try {
		const userList = await usersdb.get();
		res.status(200).json({ success: true, userList });
	} catch {
		res.status(500).json({ success: false, message: `can\'t get users` });
	}
});

// Get specific user with ID
router.get('/:id', async (req, res) => {
	try {
		const userId = await usersdb.getById(req.params.id);
		res.status(200).json({ success: true, userId });
	} catch {
		res.status(500).json({ success: false, message: `can\'t get users` });
	}
});

// Get all posts for specific user ID
router.get('/:id/posts', async (req, res) => {
	try {
		const userPosts = await usersdb.getUserPosts(req.params.id);
		res.status(200).json({ success: true, userPosts });
	} catch {
		res.status(500).json({ success: false, message: `can\'t get posts` });
	}
});

// Edit a user - NOT WORKING
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const changes = { name };
	try {
		const user = await usersdb.getById(id);
		if (user) {
			usersdb.update(id, changes);
			res.status(200).json({ success: true, message: `user updated` });
		} else {
			res.status(404).json({ success: false, message: 'User not found' });
		}
	} catch {
		res.status(500).json({ success: false });
	}
});

module.exports = router;
