const express = require('express');
const asyncHandler = require('express-async-handler');
const { Drink } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const drinks = await Drink.findAll();
    
    if (drinks.length) return res.json({ drinks });
    return res.json({});
}));

module.exports = router;