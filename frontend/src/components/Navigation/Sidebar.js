import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'

const Sidebar = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const userId = useSelector(state => state.session.user.id);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const logout = event => {
        event.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    const goToCreate = event => {
        event.preventDefault();
        setShowMenu(false);
        history.push('/drinks/create')
    };

    const goToProfile = event => {
        event.preventDefault();
        setShowMenu(false);
        history.push(`/users/${userId}`)
    }

    return (
        <>
            <button onClick={openMenu} className="open-menu-button"><div className="top-bar"></div><div className="middle-bar"></div><div className="bottom-bar"></div></button>
            <div className="sidebar" style={showMenu ? { transform: 'translateX(-100%)' } : {}}>
            {showMenu && (
                <div className="sidebar-list">
                    <h2 className="username">{user.username}</h2>
                    <button onClick={goToCreate} className="button-1 btn create-button"><label id="create-label">Create Beer!</label></button>
                    <button onClick={goToProfile} className="button-1 btn profile-button"><label id="profile-label">Go to Profile</label></button>
                    <button onClick={logout} className="button-1 btn logout-button"><label id="logout-label">Log out</label></button>
                    <div className="outer" id="side">
                        <div className="inner" id="side">
                            <pre id="close-label" className="close-menu"><button className="close-button btn close-menu" onClick={event => setShowMenu(false)}>  &#62;</button></pre>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    );
};

export default Sidebar;