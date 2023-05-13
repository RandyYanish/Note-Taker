const express = require('express');
const path = requrie('path');

const PORT = process.env.port || 3001;

const app = express();

// IF middleware:

// GET Route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public/pages/404.html'))
})

app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
