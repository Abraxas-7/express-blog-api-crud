const express = require("express");
const app = express();
const PORT = process.env.PORT;

const postsRouter = require("./routes/postsRoute.js");
const usersRouter = require("./routes/usersRoute.js");

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
