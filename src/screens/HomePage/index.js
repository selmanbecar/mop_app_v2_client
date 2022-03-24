import React, {useEffect, useState} from "react"
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import UserService from "../../Services/UserService";
import QuestionList from "../../components/QuestionList";
import TopQuestion from "../../components/TopQuestion";
import "./index.css"
import TopUsers from "../../components/TopUsers";
import QuestionService from "../../Services/QuestionService";

const HomePage = () => {
    let navigate = useNavigate()
    const [user, setUser] = useState({});
    const [questions, setQuestions] = useState([]);


    const token = localStorage.getItem('token');
    let decoded;
    try {
        if (token) decoded = jwt_decode(token);
    } catch (e) {
        console.error(e)
    }

    const fetchQuestions = async (limit) => {
        const questionData = await QuestionService.getAllQuestions(limit)
        setQuestions(questionData)
    }


    // Get user information
    useEffect(() => {
        (async () => {
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

                <div className="home-nav">
                    <h3>QUESTIONNAIRE</h3>
                    {decoded ?
                        <div>
                            <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}}
                                    onClick={() => {
                                        localStorage.removeItem("token")
                                        navigate("/login", {replace: true});

                                    }}>Logout
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}}
                                    onClick={() => {

                                        navigate("/question/add", {replace: true});

                                    }}>Add question
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}}
                                    onClick={() => {

                                        navigate("/myquestion", {replace: true});

                                    }}>My questions
                            </button>
                        </div>
                        :
                        <button className="mdl-button mdl-js-button mdl-button--primary" onClick={() => {
                            navigate("/login", {replace: true});
                        }}>Login
                        </button>}
                    <a href={`/myprofile/${user.id}`} className="welcome-user">Welcome: {user.email}</a>
                </div>


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