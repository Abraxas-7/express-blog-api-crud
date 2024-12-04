const users = require('../data/users.js');

function index(req, res) {
    let filteredUsers = users.data;

    if (req.query.username) {
        filteredUsers = filteredUsers.filter(user =>
            user.username.toLowerCase().includes(req.query.username.toLowerCase())
        );
    }

    if (req.query.email) {
        filteredUsers = filteredUsers.filter(user =>
            user.email.toLowerCase().includes(req.query.email.toLowerCase())
        );
    }

    res.json({
        totalCount: filteredUsers.length,
        data: filteredUsers
    });
};

function show(req, res) {
    const userId = parseInt(req.params.id, 10);
    
    if (userId > users.totalCount || userId <= 0) {
        res.status(404).send("User non trovato");
    } else {
        const user = users.data.find(user => user.id == userId);
        res.json(user);
    }
};

function store(req, res) {
    res.send("Creazione nuovo user");
};

function update(req, res) {
    const userId = parseInt(req.params.id, 10);
    
    if (userId > users.totalCount || userId <= 0) {
        res.status(404).send("User non trovato");
    } else {
        res.send("Modifica user");
    }
};

function destroy(req, res) {
    const userId = parseInt(req.params.id, 10);

    if (userId > users.totalCount || userId <= 0) {
        res.status(404).send("User non trovato");
    }

    const userIndex = users.data.findIndex(user => user.id == userId);
    users.data.splice(userIndex, 1);
    users.totalCount--;

    users.data.forEach((user, index) => {
        user.id = index + 1;
    });

    res.status(200).send(`User con ID ${userId} eliminato con successo, totalCount diminuito a ${users.totalCount}, DB riordinato.`);
};

module.exports = { index, show, store, update, destroy };