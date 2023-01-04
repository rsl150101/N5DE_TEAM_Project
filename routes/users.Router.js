const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Review, Order } = require("../models");
const UsersController = require("../controllers/users.controller");
const router = express.Router();

const userController = new UsersController();


router
  .route("/join")
  .get(userController.getJoin)
  .post(userController.userSignup);

router.post("/login", userController.userLogin);

router.post("/logout", async (req, res) => {
  res.status(400).send({ message: "test" });
});


router.get("/:user_id", userController.orderResponse);
router.get("/:user_id/orders/:order_id", userController.reqOrderStatus);


module.exports = router;
