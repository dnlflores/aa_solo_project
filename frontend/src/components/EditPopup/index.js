import './EditPopup.css'

const EditPopup = props => {
    return (props.trigger) ? (
        <div className="edit-popup">
            <div className="popup-inner">
                <div className="outer">
                    <div className="inner">
                        <label id="close-label"><button className="close-button btn" onClick={() => props.setTrigger(false)}>Close</button></label>
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    ) : "";
}

export default EditPopup;