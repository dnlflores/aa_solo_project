import { csrfFetch } from "./csrf";

const LOAD_USER_DRINKS = 'users/LOAD_USER_DRINKS';

const loadUserDrinks = drinks => ({
    type: LOAD_USER_DRINKS,
    drinks
});

export const getUserDrinks = user => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`);

    if (response.ok) {
        const drinks = await response.json();

        dispatch(loadUserDrinks(drinks));
        return drinks;
    }
};


const usersReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_USER_DRINKS:
            const newState = {...action.drinks};
            return newState;
        default:
            return state
    }
};

export default usersReducer;