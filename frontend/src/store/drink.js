import { csrfFetch } from "./csrf";

const LOAD = 'drinks/LOAD';
const LOAD_DRINK = 'drinks/LOAD_DRINK';
const ADD_DRINK = 'drinks/ADD_DRINK';

const load = list => ({
    type: LOAD,
    list
});

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
    const response = await csrfFetch('/api/drinks', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(drink)
    });

    if (response.ok) {
        const newDrink = await response.json();
        dispatch()
    }
}

const initialState = {
    drinks: [],
}

const drinksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            // console.log('ACTION', action.list);
            const newState = { ...action.list.drinks}
            
            return newState;
        default:
            return state;
    }
}

export default drinksReducer;