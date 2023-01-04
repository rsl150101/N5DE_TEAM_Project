const authMiddleware = require("./middlewares/auth-middleware");
const { Server } = require("http");
const socketIo = require("socket.io");
const express = require("express");
const { Op } = require("sequelize");

const app = express();
const http = Server(app);
const io = socketIo(http);
const globalRouter = require("./routes/globalRouter.js");
const userRouter = require("./routes/users.Router.js");
const orderRouter = require("./routes/orders.Router");

// app.engine("html", require("ejs").renderFile);
// app.set("view engine", "ejs");

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("./assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/", userRouter);
app.use("/users", userRouter);
app.use("/api", orderRouter);

app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/users", (req, res) => {
  return res.render("customer-main");
});

http.listen(8000, () => {
  console.log(8000, "서버가 열렸습니다.");
});
