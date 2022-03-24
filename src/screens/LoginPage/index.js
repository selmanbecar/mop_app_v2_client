import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import Validator from '../../Helpers/Validation/Validations';
import "./index.css"


const LoginPage = () => {


    let navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const [loginError, setLoginError] = useState("")

    const handleEmailChange = (event) => {
        if (!Validator.required(event.target.value)) {
            setError({
                ...error,
                email: 'Please enter your email!',
            });
        } else {
            setError({
                ...error,
                email: '',
            });
        }
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        if (!Validator.required(event.target.value)) {
            setError({
                ...error,
                password: 'Please enter password!',
            });
        } else {
            setError({
                ...error,
                password: '',
            });
        }
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === '')
            setError({
                email: 'Please enter your email!',
            });
        if (password === '')
            setError({
                password: 'Please enter your password!',
            });

        AuthService.login({
            email,
            password,
        })
            .then(() => {
                navigate("/", {replace: true});
            })
            .catch(() => {
                setLoginError("Email or password are incorrect!")
            });
    };

    useEffect(() => {
        (async () => {
            if (await AuthService.verify(localStorage.getItem('token'))) {

                navigate("/", {replace: true});
            } else localStorage.removeItem('token');
        })();
    },);

    return (
        <>

            <div className="main">

                <div>

                    <h5>
                        Log in
                    </h5>
                    <form>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <p>Email: </p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            color="secondary"
                            required
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoFocus
                        />
                        </div>
                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <p>Password: </p>

                            <input
                            className="mdl-textfield__input"
                            type="password"
                            color="secondary"
                            required
                            name="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="password"
                            />
                        </div>

                        <button
                            className="mdl-button mdl-js-button mdl-button--primary"
                            type="submit"
                            onClick={handleSubmit}
                            disabled={error.email || error.password}
                        >
                            Log In
                        </button>
                        <p style={{color:"red"}}>{loginError}</p>
                        <p style={{color:"red"}}>{error.email}</p>
                        <p style={{color:"red"}}>{error.password}</p>


                        <div>
                            <div>
                                <Link
                                    to="/register"
                                    style={{
                                        color: '#2B2B2B',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Don't have an account? Sign Up <br/>
                                </Link>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;