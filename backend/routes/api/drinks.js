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
    const { id, name, description, strength, imgUrl } = req.body;

    const updatedDrink = {
        id, 
        name,
        description,
        strength,
        imgUrl
    };

    const drinkToUpdate = await Drink.findOne({
        where: {
            id
        }
    });

    await drinkToUpdate.update(updatedDrink);
    res.json({ drinkToUpdate });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.body;

    const drinkToDelete = await Drink.findOne({
        where: {
            id
        }
    });

    await drinkToDelete.destroy();
    res.json({ drinkToDelete });
}));

router.post('/', asyncHandler(async (req, res) => {
    const { name, imgUrl, description, strength, userId } = req.body;

    const newDrink = await Drink.build({
        name,
        imgUrl,
        description,
        strength,
        userId
    });

    await newDrink.save();
    res.json({ newDrink });
}));

module.exports = router;