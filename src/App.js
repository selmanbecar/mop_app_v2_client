import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage/index";
import HomePage from "./screens/HomePage";
import SingleQuestionPage from "./screens/SingleQuestionPage";
import AddQuestion from "./components/AddQuestion";
import MyQuestionPage from "./screens/MyQuestionsPage";
import MyProfile from "./screens/MyProfile";

// stilizacija,notifications, edit delete za question i za comment

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/question/:id" element={<SingleQuestionPage/>}/>
                <Route path="/question/add" element={<AddQuestion/>}/>
                <Route path="/myquestion" element={<MyQuestionPage/>}/>
                <Route path="/myprofile/:id" element={<MyProfile/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;