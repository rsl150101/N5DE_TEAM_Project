const UsersService = require("../services/users.service");
const { User } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

// User의 컨트롤러(Controller)역할을 하는 클래스
class UsersController {
  usersService = new UsersService();

  orderResponse = async (req, res, next) => {
    // 서비스 계층에 구현된 로직을 실행합니다.
    const order = await this.usersService.findMyOrder();
    res.status(200).json({ data: order });
  };

  orderRequest = async (req, res, next) => {
    const { nickname, phone, address, photo, request } = req.body;
    const { user_id } = req.params;
    const status = 0;
    const driver_id = null;
    const asign_table = 0;
    try {
      const reqOrderData = await this.usersService.newOrder(
        user_id,
        status,
        driver_id,
        nickname,
        phone,
        address,
        photo,
        request,
        asign_table
      );
      res.status(201).json({ data: reqOrderData });
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: "요청 실패" });
    }
  };

  userSignup = async (req, res) => {
    const { user_type, user_id, password, confirmPassword } = req.body;
    try {
      const reqSignUpData = await this.usersService.signUp(
        user_id,
        password,
        confirmPassword,
        user_type
      );
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
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ errorMessage: "회원가입에 실패하였습니다." });
    }
  };

  //로그인

  userLogin = async (req, res) => {
    const { user_id, password } = req.body;

    const user = await User.findOne({ where: { user_id, password } });

    // 분해
    if (!user) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
      return;
    }

    // 분해한것
    // const verifyUser = this.usersService.verifyUser(user);

    // return res.status(verifyUser.statusCode).send({
    //   errorMessage: verifyUser.msg,
    // });

    const token = jwt.sign({ user_id: User.user_id }, "customized-secret-key");

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); // 만료 시간을 60분으로 설정합니다.

    if (user.user_type === 0) {
      res.send({
        token: token,
        message: "환영합니다 고객님",
      });
    }
    if (user.user_type === 1) {
      res.send({
        token: token,
        message: "환영합니다 기사님",
      });
    }
  };
}

module.exports = UsersController;
