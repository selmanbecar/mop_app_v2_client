import React, {useEffect, useState} from "react"

import CommentService from "../../Services/CommentService";

const TopQuestion = () => {

    //states
    const [topUsers, setTopUsers] = useState([]);

    useEffect(() => {
        (async () => {
            // get top 5 users
            try {
                let topUsers = await CommentService.getTopUsers()
                topUsers = topUsers.slice(0, 5)
                setTopUsers(topUsers)
            } catch (e) {
                console.error(e)
            }
        })();
    }, []);

    return (
        <div className="comp-wrapper-element">
            {/* Get top users */}
            <h5>Top 5 Users: </h5>

            {topUsers && topUsers.map((item) => {
                return (
                    <ul>
                        <li className="mdl-list__item">
                            <i className="material-icons">star</i>
                            User id: {item.user && item.user}-
                            Comments: {item.number && item.number}
                        </li>
                    </ul>
                )
            })}

        </div>
    )
}

export default TopQuestion