import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import AuthService from '../../Services/AuthService';
import Validator from '../../Helpers/Validation/Validations';
import PropTypes from "prop-types";
import {connect, useSelector} from "react-redux";
import {register} from "../../actions/auth";

export const RegisterPage = ({register, isAuthenticated}) => {

    // states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [error, setError] = useState({});

    console.log(isAuthenticated)

    // variables
    let navigate = useNavigate()

    // handle changes
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        if (!Validator.emailValidate(event.target.value)) {
            setError({
                ...error,
                email: 'Please enter a valid email address!',
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
        if (!Validator.passwordValidate(event.target.value)) {
            setError({
                ...error,
                password: 'Password must be between 5 and 50 characters!',
            });
        } else {
            setError({
                ...error,
                password: '',
            });
        }
        setPassword(event.target.value);
    };

    const handleConfirmedPasswordChange = (event) => {
        if (!Validator.passwordValidate(event.target.value)) {
            setError({
                ...error,
                confirmedPassword: 'Password must be between 6 and 50 characters!',
            });
        } else if (event.target.value !== password) {
            setError({
                ...error,
                confirmedPassword: "Password's must match!",
            });
        } else {
            setError({
                ...error,
                confirmedPassword: '',
            });
        }
        setConfirmedPassword(event.target.value);
    };
    //Register new user function
    const handleSubmit = async (event) => {
        event.preventDefault();

        register(first_name, last_name, email, password);
        navigate("/")
    };

    useEffect(() => {
        (async () => {
            if (await AuthService.verify(localStorage.getItem('token')))
                navigate("/", {replace: true});
            else localStorage.removeItem('token');
        })();
    }, [7]);


    return (
        <>
            <div>
                <div>

                    <h5>
                        Sign up
                    </h5>
                    <form>
                        {/* Form for registration */}
                        <div>
                            <div/>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <p>First name: </p>
                                <input
                                    className="mdl-textfield__input"
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    value={first_name}
                                    onChange={handleFirstNameChange}
                                    autoComplete="first_name"
                                />
                            </div>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <p>Last name: </p>
                                <input
                                    className="mdl-textfield__input"
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={last_name}
                                    onChange={handleLastNameChange}
                                    autoComplete="last_name"
                                />
                            </div>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <p>Email: </p>
                                <input
                                    className="mdl-textfield__input"
                                    type="text"
                                    required
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <p>Password: </p>

                                <input
                                    className="mdl-textfield__input"
                                    type="password"
                                    required
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    autoComplete="password"
                                />
                            </div>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <p>Confirm Password: </p>

                                <input
                                    className="mdl-textfield__input"
                                    type="password"
                                    color="secondary"
                                    required
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    autoComplete="password"
                                    value={confirmedPassword}
                                    onChange={handleConfirmedPasswordChange}
                                />
                            </div>
                            <button
                                className="mdl-button mdl-js-button mdl-button--primary"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit}
                                disabled={
                                    error.email ||
                                    error.password ||
                                    error.confirmedPassword ||
                                    email === '' ||
                                    password === '' ||
                                    confirmedPassword === ''
                                }
                            >
                                REGISTER
                            </button>
                            <p style={{color: "red"}}>{error.email}</p>
                            <p style={{color: "red"}}>{error.password}</p>
                            <p style={{color: "red"}}>{error.confirmedPassword}</p>

                        </div>

                    </form>
                    <div>
                        <div>
                            <Link
                                to="/login"
                                style={{
                                    color: '#2B2B2B',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                }}
                            >
                                Already have an account? Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

RegisterPage.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {register})(RegisterPage);