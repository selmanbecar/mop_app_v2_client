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



    const token = localStorage.getItem('token');
    let decoded;
    if (token) decoded = jwt_decode(token);
    const location = useLocation();
    const id = location.pathname.split("/")[2]


    const fetchComments = async () => {
        let commentData = await CommentService.getComments(id)
        commentData = await Promise.all(commentData.map(async (item) => {
            const like = await LikeService.getNumberOfLikeForComment(item.id)
            return {...item, likes: like.like}
        }))
        setComment(commentData)
    }

    const fetchLikeForQuestion = async () => {
        const likesData = await LikeService.getNumberOfLikeForQuestion(id)
        setLikes(likesData)
    }

    const addQuestionLike = async () => {
        const data = {
            questionId: id,
            userId: decoded.user.id,
            isLike: true,
            isQuestion:true,
            commentId:null
        }
        try{
            const likeData = await LikeService.addLike(data)
            await fetchLikeForQuestion()
        }catch (error){
            console.log(error)
        }

    }
    const addCommentLike = async (commentId) => {
        const data = {
            questionId: null,
            userId: decoded.user.id,
            isLike: true,
            isQuestion:false,
            commentId:commentId
        }
        try{
            const likeData = await LikeService.addLike(data)
            await fetchComments()
        }catch (error){
            console.log(error)
        }

    }

    // Get user information
    useEffect(() => {
        (async () => {

            const questionData = await QuestionService.getSingleQuestion(id)
            setQuestion(questionData)

            await fetchLikeForQuestion()

            await fetchComments()

        })();


    }, []);

    return (
        <>
            <div className="question">
                <h4>
                  Title:  {question && question.title}
                </h4>
                <h5>
                  Description:   {question && question.description}
                </h5>
                <p>Created At: {question && question.createdAt}</p>
                <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={addQuestionLike}>Likes: {likes.like}</button>

            </div>
            <h5>Comment:</h5>
            <AddComment fetchComment={fetchComments}/>
            <div className="comment">
                {comment && comment.map((item) => {

                    return(
                        <div>
                        <h6>{item.comment}</h6>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" onClick={async () => {
                               await addCommentLike(item.id)
                            }}>Likes: {item.likes}</button>

                        </div>
                    )
                })}
            </div>


        </>
    )
}

export default SingleQuestionPage