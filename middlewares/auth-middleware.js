const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (req, res, next) => {

    const authorization = req.headers.cookie;
    const [cookieType, authToken] = (authorization || "").split('=');


    if (!authToken || cookieType !== 'token') {
        res.status(401).send({
            errorMessage: '로그인 후 이용 가능한 기능입니다.',
        });
        return;
    }

    try {
        const userId = jwt.verify(authToken, 'secret-key');
        console.log(userId)
        User.findOne({where: {id:userId}}).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: '로그인 후 이용 가능한 기능입니다.',
        });
    }

};
