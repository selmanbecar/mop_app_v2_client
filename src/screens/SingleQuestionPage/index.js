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
        <div className="question-wrapper">
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
                <div className="likes-dislikes">
                <span className="likes">
                <span className="material-icons like"
                      onClick={addQuestionLike}>thumb_up </span><p> {likes.like}</p></span>
                    <span className="likes">
                <span className="material-icons dislike"
                      onClick={addQuestionDislike}>thumb_down </span><p> {dislike.like}</p></span></div>
                <hr className="divider"/>
                {/* Comment data (add comment, list all, comment likes and dislike) */}
                <p style={{color: "red"}}>{error}</p>

                {/* If user is login show add comment form */}
                {decoded ? <AddComment fetchComments={fetchComments}/> :
                    <a href="/login">Please login if you want to leave comment!</a>}
            </div>

            <div className="comments">

                <div className="comment">

                    {comment && comment.map((item) => {
                        return (
                            <div className="user-comment">
                                {/* If editComment is true show comment data else show input for editing comment */}
                                <div>
                                    {editComment ? <h6 className="comment-text">{item.comment}</h6> :
                                        <div>
                                            <p>Comment:</p>
                                            <input
                                                className="mdl-textfield__input"
                                                type="text"
                                                id="comment"
                                                name="comment"
                                                onChange={handleEditCommentChange}
                                            />

                                        </div>}
                                    {/* Like and dislike for comments */}
                                    <div className="likes-dislikes">
                <span className="likes">
                <span className="material-icons like"
                      onClick={async () => {
                          await addCommentLike(item.id)
                      }}>thumb_up </span><p> {item.likes}</p></span>
                                        <span className="likes">
                <span className="material-icons dislike"
                      onClick={async () => {
                          await addCommentDislike(item.id)
                      }}>thumb_down </span><p> {item.dislikes}</p></span></div>
                                </div>
                                {/* If user is owner of comment show edit and delete buttons */}
                                {item.userId === decoded?.user.id ?
                                    <div className="comment-actions">
                                        <span className="material-icons delete" onClick={async () => {
                                            await deleteComment(item.id)
                                        }}>
                                        delete
                                    </span>
                                        <span className="material-icons edit" onClick={async () => {
                                            await setEditComment(!editComment)
                                        }}
                                        >
                                        edit
                                    </span>
                                        {/* Save changes on comment */}
                                        {!editComment ? <span onClick={async () => {
                                                await editCommentFunc(item.id)
                                            }} className="material-icons">
                                            save
                                            </span>
                                            : <p></p>}

                                    </div> : <p></p>}

                            </div>

                        )
                    })}
                </div>

            </div>
        </div>
    )
}

export default SingleQuestionPage