import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDrinks } from "../../store/user";

const ProfilePage = props => {
    const user = useSelector(state => state.session.user);
    const drinks = useSelector(state => state.userDrinks);
    const dispatch = useDispatch();
    const drinksArray = Object.values(drinks);

    console.log("USER DRINKS ARRAY", drinksArray);

    useEffect(() => {
        dispatch(getUserDrinks(user));
    }, [dispatch, user]);

    return (
        <>
            <h2>{user.username}</h2>
            <h3>{user.email}</h3>
            <ul>
                {drinksArray.map(drink => (
                  <li key={drink.id}>NAME{drink.name}</li>  
                ))}
            </ul>
        </>
    );
};

export default ProfilePage;