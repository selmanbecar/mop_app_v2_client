import React, {useEffect, useState} from "react"
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

import QuestionService from "../../Services/QuestionService";
import {useLocation} from "react-router";
import CommentService from "../../Services/CommentService";
import AddComment from "../../components/AddComment";
import LikeService from "../../Services/LikeService";

const SingleQuestionPage = (props) => {
    const [question, setQuestion] = useState({});
    const [comment, setComment] = useState([]);
    const [likes, setLikes] = useState([]);
    const [dislike, setDislike] = useState([]);
    const [error, setError] = useState("");


    const token = localStorage.getItem('token');
    let decoded;
    if (token) decoded = jwt_decode(token);
    const location = useLocation();
    const id = location.pathname.split("/")[2]


    const fetchComments = async () => {
        let commentData = await CommentService.getComments(id)
        commentData = await Promise.all(commentData.map(async (item) => {
            const like = await LikeService.getNumberOfLikesForComment(item.id)
            const dislike = await LikeService.getNumberOfDislikesForComment(item.id)
            return {...item, likes: like.like, dislikes: dislike.like}
        }))
        setComment(commentData)

    }

    const fetchLikesForQuestion = async () => {
        const likesData = await LikeService.getNumberOfLikesForQuestion(id)
        setLikes(likesData)
    }

    const fetchDislikeForQuestion = async () => {
        const dislikesData = await LikeService.getNumberOfDislikesForQuestion(id)
        setDislike(dislikesData)
    }

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

    // Get user information
    useEffect(() => {
        (async () => {

            const questionData = await QuestionService.getSingleQuestion(id)
            setQuestion(questionData)

            await fetchLikesForQuestion()
            await fetchDislikeForQuestion()

            await fetchComments()

        })();


    }, []);

    return (
        <>
            <div className="question">
                <h4>
                    Title: {question && question.title}
                </h4>
                <h5>
                    Description: {question && question.description}
                </h5>
                <p>Created At: {question && question.createdAt}</p>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={addQuestionLike}>Likes: {likes.like}</button>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                        onClick={addQuestionDislike}>Dislikes: {dislike.like}</button>

            </div>
            <p style={{color: "red"}}>{error}</p>
            <h5>Comment:</h5>
            {decoded ? <AddComment fetchComments={fetchComments}/> :
                <a href="/login">Please login if you want to leave comment!</a>}

            <div className="comment">
                {comment && comment.map((item) => {

                    return (
                        <div>
                            <h6>{item.comment}</h6>
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


        </>
    )
}

export default SingleQuestionPage