const express = require('express'); // import the express package
const configureMiddleware = require('../config/middleware');

const cohortsRouter = require('../routers/cohorts-router');
// const studentsRouter = require('../routers/students-router');


const server = express(); // creates the server

configureMiddleware(server);

server.use('/api/cohorts', cohortsRouter);
// server.use('/api/students', studentsRouter);

// watch for connections on port 5000
module.exports = server;