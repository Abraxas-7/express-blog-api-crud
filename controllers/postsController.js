const posts = require('../data/posts.js');

function index(req, res) {
    res.json(posts);
};

function show(req, res) {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        const post = posts.data.find(post => post.id == req.params.id);
        res.json(post);
    }
};

function store(req, res) {
    res.send("Creazione nuovo post");
};

function update(req, res) {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        res.send("Modifica post");
    }
};

function destroy(req, res) {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        res.send("Eliminazione post");
    }
};

module.exports = { index, show, store, update, destroy };
