const users = require("../data/users.js");

function index(req, res) {
  let filteredUsers = users.data;

  if (req.query.username) {
    filteredUsers = filteredUsers.filter((user) =>
      user.username.toLowerCase().includes(req.query.username.toLowerCase())
    );
  }

  if (req.query.email) {
    filteredUsers = filteredUsers.filter((user) =>
      user.email.toLowerCase().includes(req.query.email.toLowerCase())
    );
  }

  res.json({
    totalCount: filteredUsers.length,
    data: filteredUsers,
  });
}

function show(req, res) {
  const userId = parseInt(req.params.id, 10);

  const user = users.data.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).send("User non trovato.");
  }

  res.json(user);
}

function store(req, res) {
  const { username, email, password } = req.body;

  const existingEmail = users.data.find((user) => user.email === email);
  if (existingEmail) {
    return res.status(400).send("Email già in uso.");
  }

  const existingUsername = users.data.find(
    (user) => user.username === username
  );
  if (existingUsername) {
    return res.status(400).send("Username già in uso.");
  }

  let = newId = 0;
  for (let i = 0; i < users.data.length; i++) {
    if (users.data[i].id > newId) {
      newId = users.data[i].id;
    }
  }

  const newUser = {
    id: newId + 1,
    username,
    email,
    password,
  };

  users.data.push(newUser);
  users.totalCount++;

  res.status(201).json(newUser);
}

function update(req, res) {
  const userId = parseInt(req.params.id, 10);
  const { username, email, password } = req.body;

  const user = users.data.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).send("User non trovato.");
  }

  if (email && email !== user.email) {
    const existingEmail = users.data.find((user) => user.email === email);
    if (existingEmail) {
      return res.status(400).send("Email già in uso.");
    }
    user.email = email;
  }

  if (username && username !== user.username) {
    const existingUsername = users.data.find(
      (user) => user.username === username
    );
    if (existingUsername) {
      return res.status(400).send("Username già in uso.");
    }
    user.username = username;
  }

  if (password) {
    user.password = password;
  }

  res.status(200).json(user);
}

function destroy(req, res) {
  const userId = parseInt(req.params.id, 10);

  const userIndex = users.data.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send("User non trovato.");
  }

  users.data.splice(userIndex, 1);
  users.totalCount--;

  res
    .status(200)
    .send(
      `User con ID ${userId} eliminato con successo, totalCount diminuito a ${users.totalCount}`
    );
}

module.exports = { index, show, store, update, destroy };
