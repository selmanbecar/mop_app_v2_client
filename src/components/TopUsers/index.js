import React, {useEffect, useState} from "react"
import LikeService from "../../Services/LikeService";
import CommentService from "../../Services/CommentService";

const TopQuestion = () => {
    const [topUsers, setTopUsers] = useState([]);


    useEffect(() => {
        (async () => {
            let topUsers = await CommentService.getTopUser()
            topUsers = topUsers.slice(0, 5)
            setTopUsers(topUsers)

        })();
    },[]);


    return (
        <div className="comp-wrapper-element" style={{marginLeft:"20px"}}>
            <h5>Top 5 Users: </h5>

            {topUsers && topUsers.map((item) => {

                return (
                    <ul >
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