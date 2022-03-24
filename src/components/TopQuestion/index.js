import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import LikeService from "../../Services/LikeService";
import QuestionService from "../../Services/QuestionService";

const TopQuestion = () => {
    let navigate = useNavigate()
    const [topQuestion, setTopQuestion] = useState([]);


    useEffect(() => {
        (async () => {
            let topQuestionData = await LikeService.getTopQuestion()
            topQuestionData = topQuestionData.slice(0, 5).reverse()
            topQuestionData = await Promise.all(topQuestionData.map(async (item) => {
                const question = await QuestionService.getSingleQuestion(item.question)
                return {title: question.title, number: item.number}
            }))
            setTopQuestion(topQuestionData)

        })();
    },[]);


    return (
        <div className="comp-wrapper-element">
        <h5>Top 5 Questions: </h5>

                    {topQuestion && topQuestion.map((item) => {

                        return (
                            <ul >
                                <li className="mdl-list__item">
                                    <i className="material-icons">star</i>
                                     Question id: {item.title && item.title}-
                                    Likes: {item.number && item.number}
                                </li>
                            </ul>

                        )
                    })}



        </div>
    )
}

export default TopQuestion