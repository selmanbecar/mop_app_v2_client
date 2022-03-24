import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";

import QuestionList from "../../components/QuestionList";
import QuestionService from "../../Services/QuestionService";

const MyQuestionPage = () => {

    // states
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

    // Get questions by user
    const fetchQuestions = async (limit) => {
        try {
            const questionData = await QuestionService.getAllQuestionsByUser(limit)
            setQuestions(questionData)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        (async () => {
            if (!decoded) {
                navigate("/login", {replace: true});
            }
        })();
    }, []);

    return (
        <>
            {/* My questions, send data to question list component*/}
            <div>
                <div className="home-nav">
                    <h3>My Questions</h3>
                </div>
                <div className="comp-wrapper">
                    <QuestionList fetchQuestions={fetchQuestions} questions={questions}/>
                </div>
            </div>
        </>
    )
}

export default MyQuestionPage