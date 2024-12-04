const express = require('express');
const router = express.Router();

const posts = require('../data/posts.js');

// Index
router.get('/', (req, res) => {
    res.json(posts.data);
});

// Show
router.get('/:id', (req, res) => {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        const post = posts.data.find(post => post.id == req.params.id);
        res.json(post);
    }
});

// Create
router.post('/', (req, res) => {
    res.send("Creazione nuovo post");
})

// Update
router.put('/:id', (req, res) => {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        res.send("Modifica post");
    }
})

// Modify
router.patch('/:id', (req, res) => {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        res.send("Modifica post");
    }
})

// Delete
router.delete('/:id', (req, res) => {
    if (req.params.id > posts.totalCount || req.params.id <= 0) {
        res.status(404).send("Post non trovato");
    } else {
        res.send("Eliminazione post");
    }
})

module.exports = router;