const express = require("express");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Review, Order } = require("../models");
const router = express.Router();

router.post("/join", async (req, res) => {
  const { user_id, password, confirmPassword, user_type } = req.body;
  let { point } = 0;
  try {
    if (password !== confirmPassword) {
      res.status(412).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
      return;
    }
    if (user_id.length < 4) {
      res.status(412).send({
        errorMessage: "ID 형식이 올바르지 않습니다(4자 이상)",
      });
      return;
    }

    const existUsers = await User.findAll({
      where: {
        [Op.or]: [{ user_id }],
      },
    });
    if (existUsers.length) {
      res.status(412).send({
        errorMessage: "이미 사용중인 닉네임입니다.",
      });
      return;
    }

    if (user_type === 0) {
      res.status(200).send({
        message: "환영합니다 고객님!",
      });
      point = 1000000;
      await User.create({ user_id, password, user_type, point });
    }
    if (user_type === 1) {
      res.status(200).send({
        message: "환영합니다 사장님!",
      });
      point = 0;
      await User.create({ user_id, password, user_type, point });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ errorMessage: "회원가입에 실패하였습니다." });
  }
});

router.post("/login", async (req, res) => {
  const { user_id, password } = req.body;
  const user = await User.findOne({ where: { user_id, password } });
  if (!user) {
    res.status(400).send({
      errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
    });
    return;
  }
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

  if (user.user_type === 0) {
    res.send({ message: "환영합니다 고객님" });
  }
  if (user.user_type === 1) {
    res.send({ message: "환영합니다 기사님" });
  }
});

router.post("/logout", async (req, res) => {
  res.status(400).send({ message: "test" });
});

module.exports = router;
