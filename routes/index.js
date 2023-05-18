const express = require('express');

// Import modular routers for /notes
const notesRouter = require('./notes')
const diagnosticsRouter = require('./diagnostics');

const app = express();

app.use('/notes', notesRouter);
app.use('/diagnostics', diagnosticsRouter);

module.exports = app;