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
        console.log('NEW DRINK', newDrink);
        dispatch(setDrink(newDrink));
        return newDrink;
    }
}

const initialState = {
    drinks: [],
}

const drinksReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = {drinks: {}};

            for(let i = 0; i < action.list.drinks.length; i++) {
                newState.drinks[action.list.drinks[i].id] = action.list.drinks[i];
            }
            
            return newState;
        case SET_DRINK:
            const updateState = {...state};
            console.log('ORIGINAL STATE', state ,'UPDATED STATE', updateState, 'DRINK FROM ACTION', action.drink.drinkToUpdate);
            updateState.drinks[action.drink.drinkToUpdate.id] = action.drink.drinkToUpdate;
            // console.log('AFTER STATE', updateState);
            return updateState;
        default:
            return state;
    }
}

export default drinksReducer;