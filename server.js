const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const postsRouter = require("./routes/postsRoute.js");
const usersRouter = require("./routes/usersRoute.js");

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());
app.use(express.static("public"));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
