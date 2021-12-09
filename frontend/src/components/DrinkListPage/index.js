import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { getDrinks, editDrink } from '../../store/drink';
import './DrinkList.css';
import EditPopup from '../EditPopup';

const DrinkListPage = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const drinks = useSelector(state => state.drinks);
    const sessionUser = useSelector(state => state.session.user);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [drinkName, setDrinkName] = useState('');
    const [strength, setStrength] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);
    console.log('DRINKS FROM STATE', drinks);
    const drinksArray = Object.values(drinks);

    useEffect(() => {
        dispatch(getDrinks());
    }, [dispatch]);

    const handleEditSubmit = async event => {
        event.preventDefault();

        const drinkId = event.target[0].id;
        const drink = drinksArray.find(drink => drink.id === +drinkId)

        let newDrinkName = drink.name;
        let newStrength = drink.strength;
        let newDescription = drink.description;

        if (drink) {
            if (drinkName !== '') newDrinkName = drinkName;
            if (strength !== '') newStrength = strength;
            if (description !== '') newDescription = description;

        }

        const payload = {
            ...drink,
            name: newDrinkName,
            strength: newStrength,
            description: newDescription
        }

        let updatedDrink = await dispatch(editDrink(payload));
        if (updatedDrink) {
            console.log("UPDATED DRINK", updatedDrink);
            setButtonPopup(false);
            setDrinkName('');
            setStrength('');
            setDescription('');
            setImgUrl('')
        }
    };

    return (
        <ul className="beer-list-ul">
            {drinksArray.map(drink => (
                <li className="beer-li" key={`${drink.id}-li`}>
                    <img src={drink.imgUrl} alt="beer" className="beer-img" id={`beer-${drink.id}`}></img>
                    <div className="beer-info-div" id={`beer-${drink.id}-div`}>
                        <h2 className="drink-title" id={`beer-${drink.id}-title`}>{drink.name}</h2>
                        <div className="strength-edit-container">
                            <p className="drink-strength" id={`beer-${drink.id}-strength`}>Strength: {drink.strength}% ABV</p>
                            {sessionUser.id === drink.userId &&
                                <>
                                    <button className="button button--janus edit-drink-button" onClick={event => setButtonPopup(true)}><span>Edit</span></button>
                                    <EditPopup trigger={buttonPopup} setTrigger={setButtonPopup} drink={drink}>
                                        <h3 className="edit-popup-title">{drink.name}</h3>
                                        <form className="edit-popup-form" onSubmit={handleEditSubmit}>
                                            <div className="signup-error-list">
                                                <ul className="errors-ul">
                                                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                                                </ul>
                                            </div>
                                            <div className="edit-drink-div">
                                                <div className="edit-drink-name-div edit-input-container">
                                                    <input
                                                        type='text'
                                                        value={drinkName}
                                                        onChange={event => {
                                                            setDrinkName(event.target.value);
                                                            const descInput = document.getElementById("drink-description-input");
                                                            const strenInput = document.getElementById("drink-strength-input");
                                                            const imgUrlInput = document.getElementById("drink-img-url-input");

                                                            if (strenInput.hasAttribute("required")) strenInput.removeAttribute("required");
                                                            if (event.target.value === '') strenInput.setAttribute("required", "true");

                                                            if (descInput.hasAttribute("required")) descInput.removeAttribute("required");
                                                            if (event.target.value === '') descInput.setAttribute("required", "true");

                                                            if (imgUrlInput.hasAttribute("required")) imgUrlInput.removeAttribute("required");
                                                            if (event.target.value === '') imgUrlInput.setAttribute("required", "true");
                                                        }}
                                                        className="drink-name-input"
                                                        required
                                                        id={`${drink.id}`}
                                                    />
                                                    <label className="drink-name-label">Name</label>
                                                </div>
                                                <div className="drink-description-div edit-input-container">
                                                    <input
                                                        type='text'
                                                        value={description}
                                                        onChange={event => {
                                                            setDescription(event.target.value);
                                                            const nameInput = document.getElementById(`${drink.id}`);
                                                            const strenInput = document.getElementById("drink-strength-input");
                                                            const imgUrlInput = document.getElementById("drink-img-url-input");

                                                            if (strenInput.hasAttribute("required")) strenInput.removeAttribute("required");
                                                            if (event.target.value === '') strenInput.setAttribute("required", "true");

                                                            if (nameInput.hasAttribute("required")) nameInput.removeAttribute("required");
                                                            if (event.target.value === '') nameInput.setAttribute("required", "true");

                                                            if (imgUrlInput.hasAttribute("required")) imgUrlInput.removeAttribute("required");
                                                            if (event.target.value === '') imgUrlInput.setAttribute("required", "true");
                                                        }}
                                                        required
                                                        id="drink-description-input"
                                                    />
                                                    <label className="drink-description-label">Description</label>
                                                </div>
                                                <div className="drink-strength-div edit-input-container">
                                                    <input
                                                        type="text"
                                                        value={strength}
                                                        onChange={event => {
                                                            const result = Number(event.target.value);

                                                            console.log('RESULT', result);

                                                            const descInput = document.getElementById("drink-description-input");
                                                            const nameInput = document.getElementById(`${drink.id}`);
                                                            const imgUrlInput = document.getElementById("drink-img-url-input");
                                                            
                                                            if (result >= 0) {
                                                                setErrors([])
                                                                setStrength(event.target.value);

                                                                if (nameInput.hasAttribute("required")) nameInput.removeAttribute("required");
                                                                if (event.target.value === '') nameInput.setAttribute("required", "true");

                                                                if (descInput.hasAttribute("required")) descInput.removeAttribute("required");
                                                                if (event.target.value === '') descInput.setAttribute("required", "true");

                                                                if (imgUrlInput.hasAttribute("required")) imgUrlInput.removeAttribute("required");
                                                                if (event.target.value === '') imgUrlInput.setAttribute("required", "true");
                                                            } else if (event.target.value !== ''){
                                                                setErrors(['Strength must be a positive number.']);
                                                            } else {
                                                                setStrength(event.target.value);
                                                                setErrors([]);
                                                                descInput.removeAttribute("required");
                                                                nameInput.removeAttribute("required");
                                                            }
                                                        }}
                                                        id="drink-strength-input"
                                                        required
                                                    />
                                                    <label className="drink-strength-label">Strength</label>
                                                </div>
                                                <div className="drink-img-url-div edit-input-container">
                                                    <input
                                                        type="text"
                                                        value={imgUrl}
                                                        onChange={event => {
                                                            setImgUrl(event.target.value);
                                                            const descInput = document.getElementById("drink-description-input");
                                                            const strenInput = document.getElementById("drink-strength-input");
                                                            const nameInput = document.getElementById(`${drink.id}`);

                                                            if (strenInput.hasAttribute("required")) strenInput.removeAttribute("required");
                                                            if (event.target.value === '') strenInput.setAttribute("required", "true");

                                                            if (descInput.hasAttribute("required")) descInput.removeAttribute("required");
                                                            if (event.target.value === '') descInput.setAttribute("required", "true");

                                                            if (nameInput.hasAttribute("required")) nameInput.removeAttribute("required");
                                                            if (event.target.value === '') nameInput.setAttribute("required", "true");
                                                        }}
                                                        id="drink-img-url-input"
                                                        required
                                                    />
                                                    <label className="drink-img-url-label">Image URL</label>
                                                </div>
                                                <button type="submit" className="edit-drink-button button-2" id={`${drink.id}`}>Submit!</button>
                                            </div>
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