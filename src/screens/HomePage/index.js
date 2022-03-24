import React, {useEffect, useState} from "react"
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

import TopUsers from "../../components/TopUsers";
import QuestionList from "../../components/QuestionList";
import TopQuestion from "../../components/TopQuestion";
import UserService from "../../Services/UserService";
import QuestionService from "../../Services/QuestionService";
import "./index.css"

const HomePage = () => {

    // states
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState([]);

    // variables
    let navigate = useNavigate()
    const token = localStorage.getItem('token');
    let decoded;

    try {
        if (token) decoded = jwt_decode(token);
    } catch (e) {
        console.error(e)
    }

    // Fetch questions
    const fetchQuestions = async (limit) => {
        const questionData = await QuestionService.getAllQuestions(limit)
        setQuestions(questionData)
    }

    // Get user information
    useEffect(() => {
        (async () => {
            // Get user
            if (decoded) {
                const userData = await UserService.getSingleUser(decoded?.user.id)
                setUser(userData)
            } else {
                setUser({email: "Unknown"})
            }
        })();
    }, []);

    return (
        <>
            <div>
                {/* Home page */}
                <div className="home-nav">
                    <h3>QUESTIONNAIRE</h3>
                    {/* If user is login show logout, add new question, my question */}
                    {decoded ?
                        <div>
                            {/* Logout */}
                            <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}}
                                    onClick={() => {
                                        localStorage.removeItem("token")
                                        navigate("/login", {replace: true});

                                    }}>Logout
                            </button>
                            {/* Add question */}
                            <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}}
                                    onClick={() => {
                                        navigate("/question/add", {replace: true});
                                    }}>Add question
                            </button>
                            {/* My questions */}
                            <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}}
                                    onClick={() => {
                                        navigate("/myquestion", {replace: true});
                                    }}>My questions
                            </button>
                        </div>

                        :
                        <div>
                            {/* If user is not login then show login button*/}
                            <button className="mdl-button mdl-js-button mdl-button--primary" onClick={() => {
                                navigate("/login", {replace: true});
                            }}>
                                Login
                            </button>
                        </div>}
                    <a href={`/myprofile/${user.id}`} className="welcome-user">Welcome: {user.email}</a>
                </div>
                {/* Show top questions, top users and List of questions*/}
                <div className="comp-wrapper">
                    <TopQuestion/>
                    <TopUsers/>
                    <QuestionList fetchQuestions={fetchQuestions} questions={questions}/>
                </div>
            </div>
        </>
    )
}

export default HomePage