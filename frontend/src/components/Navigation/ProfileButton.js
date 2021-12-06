import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = event => {
        event.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            <button onClick={openMenu} className='profile-button'>
                <i className="fas fa-user-circle" />
                {showMenu && (
                    <ul className="profile-dropdown">
                        <li className="username">{user.username}</li>
                        <li className="email">{user.email}</li>
                        <li>
                            <button onClick={logout} className='logout-button'>Log Out</button>
                        </li>
                    </ul>
                )}
            </button>
        </>
    );
}

export default ProfileButton;