const express = require('express');
const asyncHandler = require('express-async-handler');
const { Drink } = require('../../db/models');
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const drinks = await Drink.findAll();

    if (drinks.length) return res.json({ drinks });
    return res.json({});
}));

router.patch('/:id', asyncHandler(async (req, res) => {
    const { id, name, description, strength } = req.body;

    const updatedDrink = {
        id, 
        name,
        description,
        strength
    };

    const drinkToUpdate = await Drink.findOne({
        where: {
            id
        }
    });

    router.post('/', asyncHandler(async (req, res) => {
        
    }));

    await drinkToUpdate.update(updatedDrink);
    res.json({ drinkToUpdate });
}));

module.exports = router;