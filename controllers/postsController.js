const posts = require("../data/posts.js");
const { post } = require("../routes/postsRoute.js");

function index(req, res) {
  let filteredPosts = posts.data;

  if (req.query.tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.includes(req.query.tag)
    );
  }

  if (req.query.titolo) {
    filteredPosts = filteredPosts.filter((post) =>
      post.titolo.toLowerCase().includes(req.query.titolo.toLowerCase())
    );
  }

  res.json({
    totalCount: filteredPosts.length,
    data: filteredPosts,
  });
}

function show(req, res) {
  const postId = parseInt(req.params.id, 10);

  if (postId > posts.totalCount || postId <= 0) {
    res.status(404).send("Post non trovato");
  } else {
    const post = posts.data.find((post) => post.id == postId);
    res.json(post);
  }
}

function store(req, res) {
  const { titolo, contenuto, immagine, tags } = req.body;

  if (!titolo || !contenuto || !tags) {
    return res
      .status(400)
      .send("Dati incompleti, titolo, contenuto e tags sono obbligatori.");
  }

  let = newId = 0;
  for (let i = 0; i < posts.data.length; i++) {
    if (posts.data[i].id > newId) {
      newId = posts.data[i].id;
    }
  }

  const newPost = {
    id: newId + 1,
    titolo,
    contenuto,
    immagine: immagine || "#",
    tags,
  };

  posts.data.push(newPost);
  posts.totalCount++;

  res.status(201).json(newPost);
}

function update(req, res) {
  const postId = parseInt(req.params.id, 10);

  if (postId > posts.totalCount || postId <= 0) {
    res.status(404).send("Post non trovato");
  } else {
    const { titolo, contenuto, immagine, tags } = req.body;

    const post = posts.data.find((post) => post.id == postId);
    post.titolo = titolo || post.titolo;
    post.contenuto = contenuto || post.contenuto;
    post.immagine = immagine || post.immagine;
    post.tags = tags || post.tags;

    res.json(post);
  }
}

function destroy(req, res) {
  const postId = parseInt(req.params.id, 10);

  if (postId > posts.totalCount || postId <= 0) {
    res.status(404).send("Post non trovato");
  }

  const postIndex = posts.data.findIndex((post) => post.id == postId);
  posts.data.splice(postIndex, 1);
  posts.totalCount--;

  res
    .status(200)
    .send(
      `Post con ID ${postId} eliminato con successo, totalCount diminuito a ${posts.totalCount}`
    );
}

module.exports = { index, show, store, update, destroy };
