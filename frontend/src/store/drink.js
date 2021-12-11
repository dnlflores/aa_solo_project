import { csrfFetch } from "./csrf";

const LOAD = 'drinks/LOAD';
const ADD_DRINK = 'drinks/ADD_DRINK';
const SET_DRINK = 'drinks/SET_DRINK';
const DELETE_DRINK = 'drinks/DELETE_DRINK'
const LOAD_USER_DRINKS = 'users/LOAD_USER_DRINKS';

const loadUserDrinks = drinks => ({
    type: LOAD_USER_DRINKS,
    drinks
});

const load = list => ({
    type: LOAD,
    list
});

const setDrink = drink => ({
    type: SET_DRINK,
    drink
})

const deleteDrink = drink => ({
    type: DELETE_DRINK,
    drink
})

const addDrink = drink => ({
    type: ADD_DRINK,
    drink
});

export const getUserDrinks = user => async dispatch => {
    const response = await csrfFetch(`/api/users/${user.id}`);

    if (response.ok) {
        const drinks = await response.json();

        dispatch(loadUserDrinks(drinks));
        return drinks;
    }
};

export const getDrinks = () => async dispatch => {
    const response = await csrfFetch('/api/drinks');

    if (response.ok) {
        const drinks = await response.json();
        
        dispatch(load(drinks));
        return drinks;
    }
};

export const editDrink = drink => async dispatch => {
    const response = await csrfFetch(`/api/drinks/${drink.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(drink)
    });
    
    if (response.ok) {
        const newDrink = await response.json();

        dispatch(setDrink(newDrink));
        return newDrink;
    }
}

export const addNewDrink = drink => async dispatch => {
    const response = await csrfFetch('/api/drinks', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(drink)
    });

    if (response.ok) {
        const newDrink = await response.json();
        dispatch(addDrink(newDrink));
        return newDrink;
    }
};

export const deleteOneDrink = drink => async dispatch => {
    const response = await csrfFetch(`/api/drinks/${drink.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(drink)
    });

    if (response.ok) {
        const drinkToDelete = await response.json();
        dispatch(deleteDrink(drinkToDelete));
        return drinkToDelete;
    }
};

const initialState = {
    drinks: [],
}

const drinksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {};
            for(let i = 0; i < action.list.drinks.length; i++) {
                newState[action.list.drinks[i].id] = action.list.drinks[i];
            }
            return newState;
        case SET_DRINK:
            const updateState = {...state};
            updateState[action.drink.drinkToUpdate.id] = action.drink.drinkToUpdate;
            return updateState;
        case ADD_DRINK:
            const addState = {drinks: {}};
            addState.drinks = {...state}
            return addState;
        case DELETE_DRINK:
            const deleteState = {...state};
            delete deleteState[action.drink.drinkToDelete.id];
            return deleteState;
        case LOAD_USER_DRINKS:
            const newDrinksState = {};
            action.drinks.drinks.forEach(drink => newDrinksState[drink.id] = drink);
            // newDrinksState[]
            return newDrinksState;
        default:
            return state;
    }
}

export default drinksReducer;