import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    )

    const handleSubmit = event => {
        event.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="login-error-list">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
            <div className="login-div">
                <label className="login-username-label">
                    Username/Email: 
                    <input
                        type='text'
                        value={credential}
                        onChange={event => setCredential(event.target.value)}
                        required
                        id="login-username-input"
                    />
                </label>
                <label className="password-label">
                    Password: 
                    <input 
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        id="login-password-input"
                    />
                </label>
                <button type="submit" id="login-button">Log In</button>
            </div>
        </form>
    )
}

export default LoginFormPage;