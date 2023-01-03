const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller.js");
const usersController = new UsersController();

router.get("/:user_id", usersController.orderResponse);
module.exports = router;
