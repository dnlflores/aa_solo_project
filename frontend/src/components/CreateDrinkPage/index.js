import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewDrink } from '../../store/drink';
import './CreateDrinkPage.css';

const CreateDrinkPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [drinkName, setDrinkName] = useState('');
    const [strength, setStrength] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const checkErrors = () => {
        const arr = []
        if (drinkName === '') arr.push('Please put a name for the drink')
        if (drinkName.length > 50) arr.push('Drink name must be less than 50 characters');
        if (Number(strength) < 0) arr.push('Strength must be a positve number.')
        if (description === '') arr.push('Please give a description');
        return arr
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
            const newDrink = await dispatch(addNewDrink(payload));
            console.log("NEW DRINK", newDrink);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="create-error-list">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
            <div className="create-div">
                <label className="create-drink-name-label">
                    Beer Name:
                    <input
                        type='text'
                        value={drinkName}
                        onChange={event => setDrinkName(event.target.value)}
                        required
                        id="create-drink-name-input"
                    />
                </label>
                <label className="img-url-label">
                    Image URL:
                    <input
                        type="text"
                        value={imgUrl}
                        onChange={event => setImgUrl(event.target.value)}
                        required
                        id="img-url-input"
                    />
                </label>
                <label className="description-label">
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        required
                        id="description-input"
                    />
                </label>
                <label className="strength-label">
                    Strength (ABV %):
                    <input
                        type="text"
                        value={strength}
                        onChange={event => setStrength(event.target.value)}
                        required
                        id="strength-input"
                    />
                </label>
                <button type="submit" className="login-button btn button-1">Create Beer!</button>
            </div>
        </form>
    )
}

export default CreateDrinkPage;