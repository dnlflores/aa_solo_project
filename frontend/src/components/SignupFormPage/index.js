import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    )

    const handleSubmit = event => {
        event.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="signup-error-list">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
            <div className="signup-div">
                <div className="signup-username-div">
                    <label className="signup-username-label">Username: </label>
                    <input
                        type='text'
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        required
                        id="signup-username-input"
                    />
                </div>
                <div className="signup-email-div">
                    <label className="signup-email-label">Email: </label>
                    <input
                        type='text'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                        id="signup-email-input"
                    />
                </div>
                <div className="signup-password-div">
                    <label className="signup-password-label">Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        id="signup-password-input"
                    />
                </div>
                <div className="signup-confirm-password-div">
                    <label className="signup-confirm-password-label">Confirm Password: </label> 
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                        required
                        id="signup-confirm-password-input"
                    />
                </div>
                <button type="submit" id="signup-button">Sign Up</button>
            </div>
        </form>
    )
};

export default SignupFormPage;