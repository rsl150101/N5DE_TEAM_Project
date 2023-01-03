const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Review, Order } = require("../models");
const UsersController = require("../controllers/users.controller");
const router = express.Router();

const userController = new UsersController();

router.post("/join", userController.userSignup);

router.post("/login", userController.userLogin);

router.post("/logout", async (req, res) => {
  res.status(400).send({ message: "test" });
});

module.exports = router;
