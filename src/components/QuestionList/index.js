import React, {useEffect, useState} from "react"

import "./index.css";

const QuestionList = ({fetchQuestions, questions}) => {

    // states
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        (async () => {
            try {
                await fetchQuestions(limit)
            } catch (e) {
                console.error(e)
            }
        })();
    }, [limit]);

    return (
        <div className="list-wrapper">
            <div className="">
                <div className="card">
                    <span className="mdl-layout-title">Last questions:</span>
                    {questions?.map((item) => {
                        return (
                            <ul className='mdl-list card-list'>
                                <li className="mdl-list__item">
                                    <a href={`/question/${item.id}`} className="mdl-list__item-primary-content">
                                        {item?.title}
                                    </a>
                                </li>
                            </ul>
                        )
                    })}
                </div>


            </div>
            {/* Load more questions button */}
            <button className="mdl-button mdl-js-button mdl-button--primary" onClick={() => {
                setLimit(limit + 20)
            }}>Load more
            </button>
        </div>

    )
}

export default QuestionList