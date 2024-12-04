const express = require('express');
const app = express();
const PORT = 3000;

const postsRouter = require('./routes/posts');

app.use(express.static('public'));

app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.send("Server del mio blog");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
