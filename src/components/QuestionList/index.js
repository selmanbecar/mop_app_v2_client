import React, {useEffect, useState} from "react"

import "./index.css";

const QuestionList = ({fetchQuestions, questions}) => {

    // states
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        (async () => {
            try {
                fetchQuestions(limit)
            } catch (e) {
                console.error(e)
            }
        })();
    }, [limit]);

    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Last questions:</span>
                {questions && questions.map((item) => {
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
                {/* Load more questions button */}
                <button className="mdl-button mdl-js-button mdl-button--primary" onClick={() => {
                    setLimit(limit + 20)
                }}>Load more
                </button>
            </main>
        </div>


    )
}

export default QuestionList