import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditPopup from '../EditPopup';

const Drink = ({ drink }) => {
    const sessionUser = useSelector(state => state.session.user);
    const [buttonPopup, setButtonPopup] = useState(false);
    
    return (
        <>
            <img src={drink.imgUrl} alt="beer" className="beer-img" id={`beer-${drink.id}`}></img>
            <div className="beer-info-div" id={`beer-${drink.id}-div`}>
                <h2 className="drink-title" id={`beer-${drink.id}-title`}>{drink.name}</h2>
                <div className="strength-edit-container">
                    <p className="drink-strength" id={`beer-${drink.id}-strength`}>Strength: {drink.strength}% ABV</p>
                    {sessionUser.id === drink.userId &&
                        <>
                            <button className="button button--janus edit-drink-button" onClick={event => setButtonPopup(true)}><span>Edit</span></button>
                            <EditPopup trigger={buttonPopup} setTrigger={setButtonPopup} drink={drink} />
                        </>}
                </div>
                <p className="drink-description" id={`beer-${drink.id}-description`}>{drink.description}</p>
            </div>
        </>
    )
};

export default Drink;