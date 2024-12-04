const express = require('express');
const app = express();
const PORT = process.env.PORT;

const postsRouter = require('./routes/postsRoute.js');

app.use(express.static('public'));

app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.send("Server del mio blog");
});

console.log(process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
