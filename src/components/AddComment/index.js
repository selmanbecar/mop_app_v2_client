import React, {useEffect, useState} from "react"
import {useLocation} from "react-router";
import jwt_decode from 'jwt-decode';

import CommentService from "../../Services/CommentService";


const AddComment = ({fetchComments}) => {

    //states
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");


    //handle changes
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    //variables
    const location = useLocation();
    const questionId = location.pathname.split("/")[2]
    const token = localStorage.getItem('token');
    let decoded;

    if (token) decoded = jwt_decode(token);

    //add function for adding new Comment record
    const addComment = async (event) => {
        event.preventDefault();

        const data = {
            comment,
            userId: decoded.user.id,
            questionId
        }

        if (comment !== "") {
            await CommentService.addComment(data);
            fetchComments()
            setComment("")
            setError("")
        } else {
            setError("Please enter your comment!")
        }
    };

    return (
        <div>
            {/* Add new comment form */}
            <form>
                <div>
                    <div/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <p>Add a Comment</p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </div>

                    <button
                        className="mdl-button mdl-js-button mdl-button--primary"
                        type="submit"
                        onClick={addComment}
                    >
                        Add
                    </button>
                </div>
            </form>
            <p style={{color: "red"}}>{error}</p>
        </div>
    )
}

export default AddComment