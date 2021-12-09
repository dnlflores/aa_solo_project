import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom'

const Sidebar = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

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
    };

    return (
        <>
            <button onClick={openMenu} className="open-menu-button"><div className="top-bar"></div><div className="middle-bar"></div><div className="bottom-bar"></div></button>
            <div className="sidebar" style={showMenu ? { transform: 'translateX(-100%)' } : {}}>
            {showMenu && (
                <div className="sidebar-list">
                    <h2 className="username">{user.username}</h2>
                    <p className="email">{user.email}</p>
                    <button onClick={goToCreate} className="button-1 btn create-button"><NavLink id="create-label" to="/drinks/create">Create Beer!</NavLink></button>
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