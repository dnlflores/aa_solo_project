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
            });
    }

    const handleDemo = event => {
        event.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="login-error-list">
                <ul>
                    {errors.map((error, index) => <li key={index}>{error}</li>)}
                </ul>
            </div>
            <div className="login-div">
                <div className="login-input-container">
                    <input
                        type='text'
                        value={credential}
                        onChange={event => setCredential(event.target.value)}
                        required
                        id="login-username-input"
                    />
                    <label className="login-username-label">Username/Email</label>
                </div>
                <div className="login-input-container">
                    <input 
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        id="login-password-input"
                    />
                    <label className="password-label">Password</label>
                </div>
            </div>
            <button type="submit" className="login-button btn button-1">Log In</button>
            <button className="demo-button btn button-1" onClick={handleDemo}>Demo</button>
        </form>
    )
}

export default LoginFormPage;