#!/usr/bin/env node
const express = require('express');
const path = require('path');
const app = express();
const port = 7900;

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '.')));

// Define a catch-all route to serve your React app
app.get('/:source', (req, res) => {
    if (!req.params.source) {
        res.sendFile(path.join(__dirname, '.', 'index.html'));
        return
    }
    try {
        if (path.join(__dirname, 'build', req.params.source)) {
            res.sendFile(path.join(__dirname, '.', req.params.source));
        } else {
            res.sendFile(path.join(__dirname, '.', 'not_found.html'));
        }
    } catch (error) {
        console.log(error);
    }
    // if (path.join(__dirname, 'build', req.params.source)) {
    //     res.sendFile(path.join(__dirname, 'build', req.params.source));
    // } else {
    //     res.sendFile(path.join(__dirname, 'build', "not_found.html"));
    // }

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    const url = `http://localhost:${port}`;
    const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
    require('child_process').exec(start + ' ' + url);
});
