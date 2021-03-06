import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
};

export const login = user => async dispatch => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const signup = user => async dispatch => {
    const { username, password, email } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            email,
            username,
            password
        })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
};

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case REMOVE_USER:
            const newState = { ...state };
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export default sessionReducer;