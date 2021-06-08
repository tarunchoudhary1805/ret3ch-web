import React, { Component } from "react";
import { connect } from "react-redux";

class quizShow extends Component {
    // componentDidMount(){
    //     this.props.loadQuiz();
    // }
  render() {
    console.log(this.props);
  return <div>{this.props.quiz.map(quiz => <div><h1>{quiz.title}</h1></div>)}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    quiz: state.quizReducer.quiz,
  };
};
export default connect(mapStateToProps, null)(quizShow);
