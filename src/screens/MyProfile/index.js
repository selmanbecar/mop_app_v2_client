import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import jwt_decode from "jwt-decode";

import UserService from "../../Services/UserService";
import Validator from "../../Helpers/Validation/Validations";

const MyProfile = () => {

    // states
    const [user, setUser] = useState({});
    const [password, setPassword] = useState("");
    const [error, setError] = useState({})
    const [edit, setEdit] = useState(true)

    // variables
    let navigate = useNavigate()
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const token = localStorage.getItem('token');
    let decoded;

    try {
        if (token) decoded = jwt_decode(token);
    } catch (e) {
        console.error(e)
    }

    // handle changes
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

    const handleFirstNameChange = (event) => {
        setUser({...user, first_name: event.target.value});
    };

    const handleLastNameChange = (event) => {
        setUser({...user, last_name: event.target.value});
    };

    // get User by id
    const fetchUser = async () => {
        try {
            const userData = await UserService.getSingleUser(id)
            setUser(userData)
        } catch (e) {
            console.error(e)
        }

    }
    // edit user
    const editUser = async () => {
        try {
            const data = {
                first_name: user.first_name,
                last_name: user.last_name
            }
            await UserService.editUser(id, data)
            await fetchUser()
            setEdit(!edit)
        } catch (e) {
            console.error(e)
        }
    }
    // edit password
    const editPassword = async () => {
        try {
            const data = {
                password: password
            }
            await UserService.editUser(id, data)
            await fetchUser()
            setPassword("")
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        (async () => {
            if (!decoded) {
                navigate("/login", {replace: true});
            } else {
                await fetchUser()
            }
        })();
    }, []);

    return (
        <>
            {/* My profile */}
            <div>
                <div className="home-nav">
                    <h3>My profile</h3>
                    {/* On click change edit state */}
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                            onClick={async () => {
                                setEdit(!edit)
                            }}>Edit
                    </button>
                </div>
                {/* If edit is true show data but if edit false show fields for edit */}
                {edit ? <div>
                        <h4>First name: {user.first_name}</h4>
                        <h4>Last name: {user.last_name}</h4>
                        <h4>Email: {user.email}</h4>
                    </div>
                    :
                    <div>
                        <p>First name:</p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleFirstNameChange}
                        />
                        <p>Last name:</p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleLastNameChange}
                        />
                        <h4>Email: {user.email}</h4>
                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                onClick={editUser}>Save
                        </button>
                    </div>}
                {/* Change password form */}
                <h4>Change password:</h4>
                <p>Password:</p>
                <input
                    className="mdl-textfield__input"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        disabled={
                            error.password ||
                            password === ''
                        }
                        onClick={editPassword}>
                    Save new password
                </button>
                {/* Errors */}
                <p style={{color: "red"}}>{error.password}</p>
            </div>
        </>
    )
}

export default MyProfile