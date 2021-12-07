import './EditPopup.css'

const EditPopup = props => {
    return (props.trigger) ? (
        <div className="edit-popup">
            <div className="popup-inner">
                <button className="close-button" onClick={() => props.setTrigger(false)}>Close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default EditPopup;