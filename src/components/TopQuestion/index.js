import React, {useEffect, useState} from "react"

import LikeService from "../../Services/LikeService";
import QuestionService from "../../Services/QuestionService";

const TopQuestion = () => {

    // states
    const [topQuestions, setTopQuestions] = useState([]);

    useEffect(() => {
        (async () => {
            //get top question data and foreach record get question title
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
            {/* Get top questions*/}
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