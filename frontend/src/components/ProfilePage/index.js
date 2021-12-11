import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDrinks } from "../../store/drink";
import Drink from "../Drink";
import './ProfilePage.css';

const ProfilePage = props => {
    const user = useSelector(state => state.session.user);
    const drinks = useSelector(state => state.drinks);
    const userDrinks = Object.values(drinks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDrinks(user));
    }, [dispatch, user]);

    return (
        <div className="profile-page-div">
            <div className="user-info-div">
                <h2 className="user-title">{user.username}</h2>
                <h3 className="user-email">{user.email}</h3>
            </div>
            <h2 className="drinks-list-title">My Drinks</h2>
            <ul>
                {userDrinks.map(drink => (
                    <li key={drink} className="drink-container"><Drink drink={drink} /></li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;