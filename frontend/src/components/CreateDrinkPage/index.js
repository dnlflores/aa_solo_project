import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './CreateDrinkPage.css';

const CreateDrinkPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [drinkName, setDrinkName] = useState('');
    const [strength, setStrength] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);


    const handleSubmit = event => {
        event.preventDefault();
        setErrors([]);
        
    }

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