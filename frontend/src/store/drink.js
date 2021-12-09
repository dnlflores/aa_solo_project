import { csrfFetch } from "./csrf";

const LOAD = 'drinks/LOAD';
const LOAD_DRINK = 'drinks/LOAD_DRINK';
const ADD_DRINK = 'drinks/ADD_DRINK';
const SET_DRINK = 'drinks/SET_DRINK';

const load = list => ({
    type: LOAD,
    list
});

const setDrink = drink => ({
    type: SET_DRINK,
    drink
})

const loadDrink = drink => ({
    type: LOAD_DRINK,
    drink
});

const addDrink = drink => ({
    type: ADD_DRINK,
    drink
});

export const getDrinks = () => async dispatch => {
    const response = await csrfFetch('/api/drinks');
    // console.log('RESPONSE FROM GET DRINKS', response);

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
            updateState.drinks[action.drink.drinkToUpdate.id] = action.drink.drinkToUpdate;
            // console.log('AFTER STATE', updateState);
            return updateState;
        case ADD_DRINK:
            const addState = {drinks: {}};
            addState.drinks = {...state}
            console.log('ADD STATE', addState);
            return addState;
        default:
            return state;
    }
}

export default drinksReducer;