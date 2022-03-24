import React, {useEffect, useState} from "react"
import jwt_decode from 'jwt-decode';
import QuestionService from "../../Services/QuestionService";
import {useNavigate} from "react-router-dom";

const AddQuestion = () => {


    let navigate = useNavigate()

    //states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");



    //handle changes
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };




    const token = localStorage.getItem('token');
    let decoded;
    if (token) decoded = jwt_decode(token);

    useEffect(() => {
        (async () => {
            if(!decoded){
                navigate("/login", {replace: true});

            }
        })();
    },);


    //add function for adding new health record
    const addQuestion = async (event) => {
        event.preventDefault();

        const data = {
           title,
            description,
            userId: decoded.user.id
        }


        await QuestionService.addQuestion(data);
        navigate("/", {replace: true});

    };


    return (
        <div>
            <h3>Add new question</h3>
            <form>
                <div>
                    <div/>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <p>Title</p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            required
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <p>Description</p>
                        <input
                            className="mdl-textfield__input"
                            type="text"
                            required
                            id="description"
                            name="title"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </div>


                    <button
                        className="mdl-button mdl-js-button mdl-button--primary"
                        type="submit"
                        onClick={addQuestion}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddQuestion