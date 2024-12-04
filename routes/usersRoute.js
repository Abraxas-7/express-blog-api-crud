const express = require('express');
const router = express.Router();

const {
    index,
    show,
    store,
    update,
    destroy
} = require("../controllers/usersController.js");

// Index
router.get('/', index);

// Show
router.get('/:id', show);

// Store
router.post('/', store)

// Update
router.put('/:id', update)

// Destroy
router.delete('/:id', destroy);

module.exports = router