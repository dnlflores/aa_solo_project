import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getDrinks } from '../../store/drink';
import Drink from '../Drink';
import './DrinkList.css';

const DrinkListPage = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const drinks = useSelector(state => state.drinks);
    const drinksArray = Object.values(drinks);

    useEffect(() => {
        dispatch(getDrinks());
    }, [dispatch]);

    
    return (
        <ul className="beer-list-ul">
            {drinksArray.map(drink => (
                <li className="beer-li" key={`${drink.id}-li`}>
                    <Drink drink={drink}/>
                </li>
            ))}
        </ul>
    )
};

export default DrinkListPage;