import React from "react";
import "./App.css";
import { Header } from "./Header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Adminlogin from "./Admin/Adminlogin";
import AdminDashboard from "./Admin/AdminDashboard";
import Blog from "./Admin/Blog/Blog";
import Quiz from "./Admin/Quiz/Quiz";
import Category from "./Admin/Category/Category";
import Topics from "./Admin/Category/Topics/Topics";
import Questions from "./Admin/Category/Questions/Questions";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={HomePage} />
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
