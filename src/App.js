import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import QuizAdd from "./QuizComponents/QuizAdd";
import Adminlogin from "./Admin/Adminlogin";
import AdminDashboard from "./Admin/AdminDashboard";
import Blog from "./Admin/Blog/Blog";
import Quiz from "./Admin/Quiz/Quiz";
import Category from "./Admin/Category/Category";
import Topics from "./Admin/Category/Topics";
import Questions from "./Admin/Category/Questions";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/quizadd" component={QuizAdd} />
      <Route exact path="/admin" component={Adminlogin} />
      <Route exact path="/adminDashboard" component={AdminDashboard} />
      <Route exact path="/blog" component={Blog} />
      <Route exact path="/quiz" component={Quiz} />
      <Route exact path="/category" component={Category} />
      <Route exact path="/topics" component={Topics} />
      <Route exact path="/questions" component={Questions} />
    </BrowserRouter>
  );
}

export default App;
