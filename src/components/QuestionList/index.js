import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import QuestionService from "../../Services/QuestionService";
import "./index.css";

const QuestionList = ({fetchQuestion, question}) => {
    let navigate = useNavigate()
    const [offset, setOffset] = useState(0);



    useEffect(() => {
        (async () => {

           fetchQuestion(offset)

        })();
        console.log(question)
    },[offset]);


    return (


            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                <div className="mdl-layout__drawer">
                    <span className="mdl-layout-title">Last questions:</span>
                    {question && question.map((item) => {
                        return (
                            <ul className='mdl-list'>
                                <li className="mdl-list__item">
                                    <a href={`/question/${item.id}`} className="mdl-list__item-primary-content">
                                        {item.title && item.title}
                                    </a>
                                </li>
                            </ul>

                        )
                    })}
                </div>
                <main className="mdl-layout__content">
                    {offset === 0 ? <p></p> : <button className="mdl-button mdl-js-button mdl-button--accent"
                                                      onClick={() => {
                                                          setOffset(offset - 20)
                                                      }}>Previus Page</button>}
                    <button className="mdl-button mdl-js-button mdl-button--primary" onClick={() => {
                        setOffset(offset + 20)
                    }}>Next Page</button>
                </main>

            </div>








    )
}

export default QuestionList