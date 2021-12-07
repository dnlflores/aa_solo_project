import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getDrinks } from '../../store/drink';
import './DrinkList.css';
import EditPopup from '../EditPopup';

const DrinkListPage = () => {
    const dispatch = useDispatch();
    const drinks = Object.values(useSelector(state => state.drinks));
    const sessionUser = useSelector(state => state.session.user);
    const [buttonPopup, setButtonPopup] = useState(false);

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
                                <>
                                    <button className="button button--janus edit-drink-button" onClick={event => setButtonPopup(true)}><span>Edit</span></button>
                                    <EditPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
                                        <h3>Edit {drink.name}</h3>
                                        <form>
                                            {/* <div className="signup-div">
                                                <div className="signup-username-div">
                                                    <label className="signup-username-label">Username: </label>
                                                    <input
                                                        type='text'
                                                        value={username}
                                                        onChange={event => setUsername(event.target.value)}
                                                        required
                                                        id="signup-username-input"
                                                    />
                                                </div>
                                                <div className="signup-email-div">
                                                    <label className="signup-email-label">Email: </label>
                                                    <input
                                                        type='text'
                                                        value={email}
                                                        onChange={event => setEmail(event.target.value)}
                                                        required
                                                        id="signup-email-input"
                                                    />
                                                </div>
                                                <div className="signup-password-div">
                                                    <label className="signup-password-label">Password: </label>
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={event => setPassword(event.target.value)}
                                                        required
                                                        id="signup-password-input"
                                                    />
                                                </div>
                                                <div className="signup-confirm-password-div">
                                                    <label className="signup-confirm-password-label">Confirm Password: </label>
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={event => setConfirmPassword(event.target.value)}
                                                        required
                                                        id="signup-confirm-password-input"
                                                    />
                                                </div>
                                                <button type="submit" id="signup-button">Sign Up</button>
                                            </div> */}
                                        </form>
                                    </EditPopup>
                                </>}
                        </div>
                        <p className="drink-description" id={`beer-${drink.id}-description`}>{drink.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
};

export default DrinkListPage;