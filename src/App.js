import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import QuizAdd from "./QuizComponents/QuizAdd";
import quizShow from "./QuizComponents/quizShow";
import Adminlogin from "./Admin/Adminlogin";
import AdminDashboard from "./Admin/AdminDashboard";
import Blog from "./Admin/Blog/Blog";
import Quiz from "./Admin/Quiz/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/quizadd" component={QuizAdd} />
      <Route exact path="/quizShow" component={quizShow} />
      <Route exact path="/admin" component={Adminlogin} />
      <Route exact path="/adminDashboard" component={AdminDashboard} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/quiz" component={Quiz} />
    </BrowserRouter>
  );
}

export default App;
