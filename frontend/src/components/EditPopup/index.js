import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { editDrink } from '../../store/drink';
import './EditPopup.css'

const EditPopup = props => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [drinkName, setDrinkName] = useState('');
    const [strength, setStrength] = useState('');
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const [drink, setDrink] = useState(props.drink);

    const handleEditSubmit = async event => {
        event.preventDefault();
        setErrors([]);

        let newDrinkName = drink.name;
        let newStrength = drink.strength;
        let newDescription = drink.description;
        let newImgUrl = drink.imgUrl;

        if (drink) {
            if (drinkName !== '') newDrinkName = drinkName;
            if (strength !== '') newStrength = strength;
            if (description !== '') newDescription = description;
            if (imgUrl !== '') newImgUrl = imgUrl;

        }

        const arr = [];
        if (newDrinkName === '') arr.push('Please put a name for the drink');
        if (newDrinkName.length > 50) arr.push('Drink name must be less than 50 characters');
        if (newDrinkName.length < 4 ) arr.push('Drink must be greater than 4 characters');
        if (newDescription.length < 10 ) arr.push('Description must be at least 10 characters')
        if (newDescription === '') arr.push('Please give a description');


        if (arr.length === 0) {
            const payload = {
                ...drink,
                name: newDrinkName,
                strength: newStrength,
                description: newDescription,
                imgUrl: newImgUrl
            }

            let updatedDrink = await dispatch(editDrink(payload));
            if (updatedDrink) {
                props.setTrigger(false);
                const { drinkToUpdate } = updatedDrink;
                setDrink(drinkToUpdate);
                setDrinkName('');
                setStrength('');
                setDescription('');
                setImgUrl('');
            }
        } else  setErrors(arr);
    };

    return (props.trigger) ? (
        <div className="edit-popup">
            <div className="popup-inner">
                <div className="outer">
                    <div className="inner">
                        <label id="close-label"><button className="close-button btn" onClick={event => {
                            props.setTrigger(false);
                            setErrors([]);
                        }}>Close</button></label>
                    </div>
                </div>
                <h3 className="edit-popup-title">{drink.name}</h3>
                <form className="edit-popup-form" onSubmit={handleEditSubmit}>
                    <div className="edit-popup-error-list">
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
                                }}
                                className="drink-name-input"
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
                                }}
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

                                    if (result >= 0) {
                                        setErrors([])
                                        setStrength(event.target.value);
                                    } else if (event.target.value !== '') {
                                        setErrors(['Strength must be a positive number.']);
                                    } else {
                                        setStrength(event.target.value);
                                        setErrors([]);
                                    }
                                }}
                                id="drink-strength-input"
                            />
                            <label className="drink-strength-label">Strength</label>
                        </div>
                        <div className="drink-img-url-div edit-input-container">
                            <input
                                type="text"
                                value={imgUrl}
                                onChange={event => {
                                    setImgUrl(event.target.value);
                                }}
                                id="drink-img-url-input"
                            />
                            <label className="drink-img-url-label">Image URL</label>
                        </div>
                        <button type="submit" className="edit-drink-button button-2" id={`${drink.id}`}>Submit!</button>
                    </div>
                </form>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default EditPopup;