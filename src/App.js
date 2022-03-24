import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import RegisterPage from "./screens/RegisterPage/index";
import HomePage from "./screens/HomePage";
import SingleQuestionPage from "./screens/SingleQuestionPage";
import AddQuestion from "./components/AddQuestion";

// sortiranje top question i top user, lajkovi na comment, stilizacija, da user mjenja password, myquestion page

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/question/:id" element={<SingleQuestionPage />} />
                <Route path="/question/add" element={<AddQuestion/>} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;