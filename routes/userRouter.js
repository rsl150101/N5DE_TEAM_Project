const express = require('express');
const router = express.Router();
const { User, Cart, Goods } = require('../models');

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
});

module.exports = router;
