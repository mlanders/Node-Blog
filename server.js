const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

//Import Routes
const userRoute = require('./data/routes/usersRoute');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

//define routes
server.use('/api/users', userRoute);
//router handler to upercase name before it reaches POST OR PUT
// //Users enpoint
// //Posts endpoint

server.get('/', async (req, res, next) => {
	res.send(`
		<h2>BINGO</h2>
        <p>You got hit the API</p>
	`);
});

//catches all non endpoints and sends a 404
server.use((req, res) => {
	res.status(404).send('Not an endpoint');
});

module.exports = server;
