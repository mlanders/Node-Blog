const express = require('express');
const usersdb = require('../helpers/userDb');
const postdb = require('../helpers/postDb');
const router = express.Router();
const { uppercase } = require('../middleware/uppercase');

// Create new user
router.post('/', uppercase, async (req, res) => {
	const { name } = req.body;
	const newUser = { name };
	console.log('newuser', newUser);

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
	const userId = await usersdb.getById(req.params.id);
	try {
		if (userID) {
			res.status(200).json({ success: true, userId });
		} else {
			res.status(404).json({ success: false, message: 'unable to find that user' });
		}
	} catch {
		res.status(500).json({ success: false, message: `User not valid` });
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

// Update a user
router.put('/:id', uppercase, async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const changes = { name };
	try {
		const user = await usersdb.getById(id);
		if (user) {
			const updatedUser = await usersdb.update(id, changes);
			res.status(200).json({ success: true, message: `user updated`, updatedUser });
		} else {
			res.status(404).json({ success: false, message: 'User not found' });
		}
	} catch {
		res.status(500).json({ success: false });
	}
});

// Delete user
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await usersdb.getById(id);
		const userPosts = await usersdb.getUserPosts(id);
		if (userPosts.length > 0) {
			for (let i = 0; i < userPosts.length; i++) {
				await postdb.remove(userPosts[i].id);
			}
			const deletedUser = await usersdb.remove(id);
			res.status(200).json({ success: true, message: `user deleted` });
		} else {
			if (user) {
				const deletedUser = await usersdb.remove(id);
				res.status(200).json({ success: true, message: `user deleted` });
			} else {
				res.status(404).json({ success: false, message: 'User not found' });
			}
		}
	} catch {
		res.status(500).json({ success: false, message: `unable to delete user` });
	}
});

module.exports = router;
