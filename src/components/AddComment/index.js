import React, {useEffect, useState} from "react"
import jwt_decode from 'jwt-decode';
import {useLocation} from "react-router";
import CommentService from "../../Services/CommentService";
import {useNavigate} from "react-router-dom";

const AddComment = ({fetchComments}) => {

    let navigate = useNavigate()
    //states
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");


    //handle changes
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const location = useLocation();
    const questionId = location.pathname.split("/")[2]

    const token = localStorage.getItem('token');
    let decoded;
    if (token) decoded = jwt_decode(token);

    useEffect(() => {
        
    },);


    //add function for adding new health record
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
            <h6>Add new Comment</h6>
            <form>
                <div>
                    <div/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <p>Comment</p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            required
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