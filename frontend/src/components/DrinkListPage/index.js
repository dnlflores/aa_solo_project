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
        <ul className="beer-list-ul">
            {drinks.map(drink => (
                <li className="beer-li">
                    <img src={drink.imgUrl} alt="beer" className="beer-img" id={`beer-${drink.id}`}></img>
                    <div className="beer-info-div">
                        <h2 className="drink-title" id={`beer-${drink.id}-title`}>{drink.name}</h2>
                        <p className="drink-strength" id={`beer-${drink.id}-strength`}>Strength: {drink.strength}% ABV</p>
                        <p className="drink-description" id={`beer-${drink.id}-description`}>{drink.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
};

export default DrinkListPage;