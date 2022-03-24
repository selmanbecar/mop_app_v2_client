import React, {useEffect, useState} from "react"
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import QuestionList from "../../components/QuestionList";
import QuestionService from "../../Services/QuestionService";

const MyQuestionPage = () => {
    let navigate = useNavigate()
    const [questions, setQuestions] = useState([]);


    const token = localStorage.getItem('token');
    let decoded;
    try {
        if (token) decoded = jwt_decode(token);
    } catch (e) {
        console.error(e)
    }

    const fetchQuestions = async (limit) => {
        try {
            const questionData = await QuestionService.getAllQuestionsByUser(limit)
            setQuestions(questionData)
        } catch (e) {
            console.error(e)
        }

    }


    // Get user information
    useEffect(() => {
        (async () => {
            if (!decoded) {
                navigate("/login", {replace: true});
            }
        })();
    }, []);

    return (
        <>
            <div>

                <div className="home-nav">
                    <h3>MyQuesion</h3>

                </div>


                <div className="comp-wrapper">
                    <QuestionList fetchQuestions={fetchQuestions} questions={questions}/>
                </div>
            </div>


        </>
    )
}

export default MyQuestionPage