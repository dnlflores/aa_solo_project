import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import Sidebar from './Sidebar';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink to="/drinks" className="strong-tab">Strongest Drinks</NavLink>
                {/* <ProfileButton user={sessionUser} /> */}
                <Sidebar user={sessionUser} />
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink to="/login" className="login-tab">Log In</NavLink>
                <NavLink to="/signup" className="signup-tab">Sign Up</NavLink>
            </>
        );
    }
    return (
        <div className="container">
            <div className="navigation-li">
                <NavLink exact to="/" className="home-tab">Home</NavLink>
                {isLoaded && sessionLinks}
            </div>
        </div>
    )
};

export default Navigation;