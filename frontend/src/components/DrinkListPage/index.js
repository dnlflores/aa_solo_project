import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
// import { Redirect } from 'react-router-dom';
import { getDrinks } from '../../store/drink';
import './DrinkList.css';

const DrinkListPage = () => {
    const dispatch = useDispatch();
    const drinks = Object.values(useSelector(state => state.drinks));
    console.log("DRINKS", drinks);

    useEffect(() => {
        dispatch(getDrinks())
    }, [dispatch]);

    return (
        <ul>
            {drinks.map(drink => (
                <li>
                    <h2>{drink.name}</h2>
                    <img src={drink.imgUrl} alt="beer"></img>
                    <p>Strength: {drink.strength}</p>
                    <p>Description: {drink.description}</p>
                </li>
            ))}
        </ul>
    )
};

export default DrinkListPage;