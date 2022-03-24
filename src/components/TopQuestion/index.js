import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import LikeService from "../../Services/LikeService";
import QuestionService from "../../Services/QuestionService";

const TopQuestion = () => {
    let navigate = useNavigate()
    const [topQuestions, setTopQuestions] = useState([]);


    useEffect(() => {
        (async () => {
            let topQuestionsData = await LikeService.getTopQuestions()
            topQuestionsData = topQuestionsData.slice(0, 5).reverse()
            topQuestionsData = await Promise.all(topQuestionsData.map(async (item) => {
                const question = await QuestionService.getSingleQuestion(item.question)
                return {title: question.title, number: item.number}
            }))
            setTopQuestions(topQuestionsData)

        })();
    }, []);


    return (
        <div className="comp-wrapper-element">
            <h5>Top 5 Questions: </h5>

            {topQuestions && topQuestions.map((item) => {

                return (
                    <ul>
                        <li className="mdl-list__item">
                            <i className="material-icons">star</i>
                            Question: {item.title && item.title}-
                            Likes: {item.number && item.number}
                        </li>
                    </ul>

                )
            })}


        </div>
    )
}

export default TopQuestion