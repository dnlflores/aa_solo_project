import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDrink } from '../../store/drink';
import './CreateDrinkPage.css';
import { useHistory } from 'react-router-dom'

const CreateDrinkPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [drinkName, setDrinkName] = useState('');
    const [strength, setStrength] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const checkErrors = () => {
        const arr = [];
        if (drinkName === '') arr.push('Please put a name for the drink');
        if (drinkName.length > 50) arr.push('Drink name must be less than 50 characters');
        if (drinkName.length < 4) arr.push('Drink must be greater than 4 characters');
        if (description.length < 10) arr.push('Description must be at least 10 characters')
        if (Number(strength) < 0) arr.push('Strength must be a positve number.');
        if (description === '') arr.push('Please give a description');
        return arr;
    }


    const handleSubmit = async event => {
        event.preventDefault();

        const drinkErrors = checkErrors();

        const payload = {
            name: drinkName,
            strength,
            imgUrl,
            description,
            userId: sessionUser.id
        }

        setErrors(drinkErrors);

        if (drinkErrors.length === 0) {
            await dispatch(addNewDrink(payload));
            history.push('/drinks');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="create-form">
            <div className="create-error-list">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
            <div className="create-div">
                <div className="create-name-div create-input-container">
                    <input
                        type='text'
                        value={drinkName}
                        onChange={event => setDrinkName(event.target.value)}
                        required
                        id="create-drink-name-input"
                    />
                    <label className="create-drink-name-label">Beer Name</label>
                </div>
                <div className="create-img-url-div create-input-container">
                    <input
                        type="text"
                        value={imgUrl}
                        onChange={event => setImgUrl(event.target.value)}
                        required
                        id="img-url-input"
                    />
                    <label className="img-url-label">Image URL</label>
                </div>
                <div className="create-description-div create-input-container">
                    <input
                        type="text"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        required
                        id="description-input"
                    />
                    <label className="description-label"> Description</label>
                </div>
                <div className="create-strength-div create-input-container">
                    <input
                        type="text"
                        value={strength}
                        onChange={event => {
                            const result = Number(event.target.value);
                            if (result >= 0) {
                                setStrength(event.target.value);
                                setErrors([]);
                            } else setErrors(['Strength must be a positive number']);
                        }}
                        required
                        id="strength-input"
                    />
                    <label className="strength-label"> Strength (ABV %)</label>
                </div>
            </div>
            <button type="submit" className="create-drink-button btn button-2">Create Beer!</button>
        </form>
    )
}

export default CreateDrinkPage;