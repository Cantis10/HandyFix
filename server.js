const express = require("express");
const app = express();
require("dotenv").config();

const path = require("path");
app.use(express.static(path.join(__dirname, "frontend")));
const PORT = process.env.PORT || 3000;

const db = require("./routes/database");

app.use(express.json());

const loginRouter = require("./routes/login");
app.use("/api/login", loginRouter);

const registerRouter = require("./routes/register");
app.use("/api/register",registerRouter);

const testRouter =require("./routes/test");
app.use("/test-db", testRouter);
app.use("/post", testRouter);
app.use("/test", testRouter);
app.use("/", testRouter);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
