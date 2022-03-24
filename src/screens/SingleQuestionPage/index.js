import React, {useEffect, useState} from "react"
import {useLocation} from "react-router";
import jwt_decode from "jwt-decode";

import AddComment from "../../components/AddComment";
import QuestionService from "../../Services/QuestionService";
import CommentService from "../../Services/CommentService";
import LikeService from "../../Services/LikeService";
import "./index.css"


const SingleQuestionPage = () => {

    // States
    const [question, setQuestion] = useState({});
    const [comment, setComment] = useState([]);
    const [likes, setLikes] = useState([]);
    const [dislike, setDislike] = useState([]);
    const [error, setError] = useState("");
    const [editComment, setEditComment] = useState(true);
    const [editCommentData, setEditCommentData] = useState("")

    //variables
    const location = useLocation();
    const id = location.pathname.split("/")[2]
    const token = localStorage.getItem('token');
    let decoded;

    if (token) decoded = jwt_decode(token);

    // handle changes
    const handleEditCommentChange = (event) => {
        setEditCommentData(event.target.value);
    };

    // Functions
    // get all comments and number of likes and dislike for each
    const fetchComments = async () => {
        let commentData = await CommentService.getComments(id)
        commentData = await Promise.all(commentData.map(async (item) => {
            const like = await LikeService.getNumberOfLikesForComment(item.id)
            const dislike = await LikeService.getNumberOfDislikesForComment(item.id)
            return {...item, likes: like.like, dislikes: dislike.like}
        }))
        setComment(commentData)

    }
    // get number of likes for question
    const fetchLikesForQuestion = async () => {
        const likesData = await LikeService.getNumberOfLikesForQuestion(id)
        setLikes(likesData)
    }
    // get number of dislikes for question
    const fetchDislikeForQuestion = async () => {
        const dislikesData = await LikeService.getNumberOfDislikesForQuestion(id)
        setDislike(dislikesData)
    }
    // add like for question
    const addQuestionLike = async () => {
        if (decoded) {
            const data = {
                questionId: id,
                userId: decoded.user.id,
                isLike: true,
                isQuestion: true,
                commentId: null
            }
            try {
                await LikeService.addLike(data)
                await fetchLikesForQuestion()
            } catch (error) {
                console.log(error)
            }
        } else {
            setError("Please login!")
        }
    }
    //add like for comments
    const addCommentLike = async (commentId) => {
        if (decoded) {
            const data = {
                questionId: null,
                userId: decoded.user.id,
                isLike: true,
                isQuestion: false,
                commentId: commentId
            }
            try {
                await LikeService.addLike(data)
                await fetchComments()
            } catch (error) {
                console.log(error)
            }
        } else {
            setError("Please login!")
        }
    }
    //add dislike for question
    const addQuestionDislike = async () => {
        if (decoded) {
            const data = {
                questionId: id,
                userId: decoded.user.id,
                isLike: false,
                isQuestion: true,
                commentId: null
            }
            try {
                await LikeService.addLike(data)
                await fetchDislikeForQuestion()
            } catch (error) {
                console.log(error)
            }
        } else {
            setError("Please login!")
        }
    }
    //add dislike for comment
    const addCommentDislike = async (commentId) => {
        if (decoded) {
            const data = {
                questionId: null,
                userId: decoded.user.id,
                isLike: false,
                isQuestion: false,
                commentId: commentId
            }
            try {
                await LikeService.addLike(data)
                await fetchComments()
            } catch (error) {
                console.log(error)
            }
        } else {
            setError("Please login!")
        }
    }
    // delete comment
    const deleteComment = async (commentId) => {
        if (decoded) {
            try {
                await CommentService.deleteComment(commentId)
                await fetchComments()
            } catch (error) {
                console.log(error)
            }
        } else {
            setError("Please login!")
        }
    }
    //edit comment
    const editCommentFunc = async (commentId) => {
        if (decoded) {
            try {
                const data = {
                    comment: editCommentData
                }
                await CommentService.editComment(commentId, data)
                await fetchComments()
                setEditComment(!editComment)
            } catch (error) {
                console.log(error)
            }
        } else {
            setError("Please login!")
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const questionData = await QuestionService.getSingleQuestion(id)
                setQuestion(questionData)

                await fetchLikesForQuestion()
                await fetchDislikeForQuestion()
                await fetchComments()
            } catch (e) {
                console.error(e)
            }
        })();
    }, []);

    return (
        <>
            {/* Single question page */}
            <div className="question">
                {/* Question data */}
                <h4>
                    Title: {question && question.title}
                </h4>
                <h5>
                    Description: {question && question.description}
                </h5>
                {/* Question like and dislike buttons */}
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={addQuestionLike}>Likes: {likes.like}</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={addQuestionDislike}>Dislikes: {dislike.like}</button>
            </div>
            <div className="comments">
                {/* Comment data (add comment, list all, comment likes and dislike) */}
                <p style={{color: "red"}}>{error}</p>
                <h5>Comment:</h5>
                {/* If user is login show add comment form */}
                {decoded ? <AddComment fetchComments={fetchComments}/> :
                    <a href="/login">Please login if you want to leave comment!</a>}
                <div className="comment">

                    {comment && comment.map((item) => {
                        return (
                            <div>
                                {/* If editComment is true show comment data else show input for editing comment */}
                                {editComment ? <h6>{item.comment}</h6> :
                                    <div>
                                        <p>Comment:</p>
                                        <input
                                            className="mdl-textfield__input"
                                            type="text"
                                            id="comment"
                                            name="comment"
                                            onChange={handleEditCommentChange}
                                        />
                                        {/* Save changes on comment */}
                                        <button
                                            onClick={async () => {
                                                await editCommentFunc(item.id)
                                            }}
                                            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                                        ><span className="material-icons">
                                            save
                                            </span>
                                        </button>
                                    </div>}

                                {/* If user is owner of comment show edit and delete buttons */}
                                {item.userId === decoded.user.id ?
                                    <div>
                                        <button
                                            onClick={async () => {
                                                await deleteComment(item.id)
                                            }}
                                            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                                        ><span className="material-icons">
                                        delete
                                    </span>
                                        </button>
                                        <button
                                            onClick={async () => {
                                                await setEditComment(!editComment)
                                            }}

                                            className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
                                        ><span className="material-icons">
                                        edit
                                    </span>
                                        </button>
                                    </div> : <p></p>}
                                {/* Like and dislike for comments */}
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                        onClick={async () => {
                                            await addCommentLike(item.id)
                                        }}>Likes: {item.likes}</button>
                                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                                        onClick={async () => {
                                            await addCommentDislike(item.id)
                                        }}>Dislikes: {item.dislikes}</button>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default SingleQuestionPage