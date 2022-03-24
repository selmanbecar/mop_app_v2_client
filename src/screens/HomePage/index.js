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
    const [question, setQuestion] = useState([]);


    const token = localStorage.getItem('token');
    let decoded;
    if (token) decoded = jwt_decode(token);

    const fetchQuestion =  async (offset) => {
        const questionData = await QuestionService.getAllQuestion(offset)
        setQuestion(questionData)
    }


    // Get user information
    useEffect(() => {
        (async () => {
            if(decoded){
                const userData = await UserService.getSingleUser(decoded.user.id)
                setUser(userData)
            }else{
                setUser({email:"Unknown"})
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
                        <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}} onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/login", {replace: true});

                        }}>Logout
                        </button>
                        <button className="mdl-button mdl-js-button mdl-button--primary" style={{height: "50px"}} onClick={() => {

                            navigate("/question/add", {replace: true});

                        }}>Add question
                        </button>
                    </div>
                    :
                    <button className="mdl-button mdl-js-button mdl-button--primary"  onClick={() => {
                        navigate("/login", {replace: true});
                    }}>Login
                    </button> }
                <h6 className="welcome-user">Welcome: {user.email}</h6>
            </div>


                <div className="comp-wrapper">
                    <TopQuestion/>
                    <TopUsers/>
                    <QuestionList  fetchQuestion={fetchQuestion} question={question}/>


                </div>
            </div>


        </>
    )
}

export default HomePage