const posts = require('../data/posts.js');

function index(req, res) {
    let filteredPosts = posts.data;
    
    if (req.query.tag) {
        filteredPosts = filteredPosts.filter(post =>
            post.tags.includes(req.query.tag)
        );
    }

    if (req.query.titolo) {
        filteredPosts = filteredPosts.filter(post =>
            post.titolo.toLowerCase().includes(req.query.titolo.toLowerCase())
        );
    }

    res.json({
        totalCount: filteredPosts.length,
        data: filteredPosts});
};

function show(req, res) {
    const postId = parseInt(req.params.id, 10);

    if (postId > posts.totalCount || postId <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        const post = posts.data.find(post => post.id == postId);
        res.json(post);
    }
};

function store(req, res) {
    res.send("Creazione nuovo post");
};

function update(req, res) {
    const postId = parseInt(req.params.id, 10);

    if (postId > posts.totalCount || postId <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        res.send("Modifica post");
    }
};

function destroy(req, res) {
    const postId = parseInt(req.params.id, 10);
    
    if (postId > posts.totalCount || postId <= 0) {
        res.status(404).send("Post non trovato");
    }

    const postIndex = posts.data.findIndex(post => post.id == postId);
    posts.data.splice(postIndex, 1);
    posts.totalCount--;

    posts.data.forEach((post, index) => {
        post.id = index + 1;
    });

    res.status(200).send(`Post con ID ${postId} eliminato con successo, totalCount diminuito a ${posts.totalCount}, DB riordinato.`);
};

module.exports = { index, show, store, update, destroy };
