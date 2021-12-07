import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getDrinks } from '../../store/drink';
import './DrinkList.css';

const DrinkListPage = () => {
    const dispatch = useDispatch();
    const drinks = Object.values(useSelector(state => state.drinks));
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getDrinks())
    }, [dispatch]);

    return (
        <ul className="beer-list-ul">
            {drinks.map(drink => (
                <li className="beer-li">
                    <img src={drink.imgUrl} alt="beer" className="beer-img" id={`beer-${drink.id}`}></img>
                    <div className="beer-info-div" id={`beer-${drink.id}-div`}>
                        <h2 className="drink-title" id={`beer-${drink.id}-title`}>{drink.name}</h2>
                        <div className="strength-edit-container">
                            <p className="drink-strength" id={`beer-${drink.id}-strength`}>Strength: {drink.strength}% ABV</p>
                            {sessionUser.id === drink.userId && 
                            <button className="button button--janus edit-drink-button"><span>Edit</span></button>}
                        </div>
                        <p className="drink-description" id={`beer-${drink.id}-description`}>{drink.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
};

export default DrinkListPage;