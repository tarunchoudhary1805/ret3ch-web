import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class QuizAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: {
        title: "",
        topic: "",
        questions: [],
      },
      review: false,
      reviewRequest: false,
      editQuizTitleState: false,
      editQuizTopicState: false,
      editQuizTitle: "",
      editQuizTopic: "",
      editReview: new Map(),
      title: false,
      topic: false,
      quizTitle: "",
      quizTopic: "",
      question: "",
      quiz_options: ["", "", "", ""],
      correct_option: null,
      submission: false,
    };

    this.handleOption = this.handleOption.bind(this);
    this.setCorrectAnswer = this.setCorrectAnswer.bind(this);
  }

  // setCorrectAnswer
  setCorrectAnswer(idx) {
    this.setState({
      correct_option: idx,
    });
  }

  // handleOption
  handleOption(idx, e) {
    const { quiz_options } = this.state;
    quiz_options[idx] = e.target.value;
    this.setState({ quiz_options });
  }

  // handleInput
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // setQuizTitleTopic
  setQuizTitleTopic = () => {
    const { quiz, quizTitle, quizTopic } = this.state;
    if (quizTitle != "" && quizTopic != "") {
      quiz.title = quizTitle;
      quiz.topic = quizTopic;
      this.setState({
        title: true,
        topic: true,
        quiz,
      });
      console.log(this.state);
    }
  };

  // submitAndContinue
  submitAndContinue = () => {
    const { quiz, quiz_options, correct_option, question } = this.state;
    const filteredAnswers = quiz_options.filter((answer) => answer != "");
    if (
      correct_option !== null &&
      question !== "" &&
      filteredAnswers.length > 1
    ) {
      const question1 = {
        question,
        correct_option,
        quiz_options: filteredAnswers,
      };
      quiz.questions.push(question1);
      this.setState({
        quiz,
        question: "",
        quiz_options: ["", "", "", ""],
        correct_option: null,
        message: "Question Added Successfully",
      });
      setTimeout(() => {
        this.setState({ message: "" });
      }, 3000);
    }
  };

  // submitAndReview
  submitAndReview = () => {
    const { quiz, quiz_options, correct_option, question } = this.state;
    const filteredAnswers = quiz_options.filter((answer) => answer != "");
    if (
      correct_option !== null &&
      question !== "" &&
      filteredAnswers.length > 1
    ) {
      const question1 = {
        question,
        correct_option,
        quiz_options: filteredAnswers,
      };
      quiz.questions.push(question1);
      this.setState({
        quiz,
        question: "",
        quiz_options: ["", "", "", ""],
        correct_option: null,
        review: true,
      });
    }
  };

  saveQuiz = () => {
    console.log("ddd");
    const { quiz, quiz_options, correct_option, question } = this.state;
    const filteredAnswers = quiz_options.filter((answer) => answer != "");
    if (
      correct_option !== null &&
      question !== "" &&
      filteredAnswers.length > 1
    ) {
      const question1 = {
        question,
        correct_option,
        quiz_options: filteredAnswers,
      };
      quiz.questions.push(question1);
      this.setState({
        quiz,
        question: "",
        quiz_options: ["", "", "", ""],
        correct_option: null,
        review: true,
      });
    }

    const payload = {
      quiz_heading: quiz.title,
      short_desc: quiz.topic,
      question_list: quiz.questions,
    };
    console.log(payload);
    this.props.submit(payload);

    this.setState({
      review: false,
      submission: true,
    });
  };
  render() {
    console.log(this.state.quiz);
    // if (this.state.submission) {
    //   return <Redirect to="/quizShow" />;
    // }
    const { correct_option, quiz_options } = this.state;
    const renderAnswers = quiz_options.map((ans, idx) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }} key={idx}>
          {correct_option === idx ? (
            <i className="far fa-check-square"></i>
          ) : (
            <i
              className="far fa-square"
              onClick={this.setCorrectAnswer.bind(this, idx)}
            ></i>
          )}
          <input
            type="text"
            name={("answer_", { ans })}
            placeholder="Enter an Answer"
            className="form-control m-2"
            value={quiz_options[idx]}
            onChange={this.handleOption.bind(this, idx)}
          />
        </div>
      );
    });
    return (
      <div className="form container border">
        {!this.state.title && (
          <div>
            <h1 className="text-center text-primary h1">Create a Quiz</h1>
            <p>
              You can create a new quiz here. Add as many questions as you want,
              you can always edit them later! However, after submission you
              cannot edit the quiz.
            </p>
            <p className="text-success h5">
              Enter a Title and Topic for Your Quiz:
            </p>
            <input
              type="text"
              name="quizTitle"
              className="form-control m-2"
              placeholder="Enter a title"
              value={this.state.quizTitle}
              onChange={this.handleInput}
            />
            <input
              className="form-control m-2"
              type="text"
              name="quizTopic"
              placeholder="Enter a topic"
              value={this.state.quizTopic}
              onChange={this.handleInput}
            />
            <button
              className="btn btn-primary m-2"
              onClick={this.setQuizTitleTopic}
            >
              Submit Topic and Title
            </button>
          </div>
        )}
        {this.state.title && this.state.topic && !this.state.submission && (
          <div>
            <h1>Add Questions</h1>
            <p>
              Be sure to add at least four quiz_options and check the box next
              to correct one!
            </p>
            <p>Questions</p>
            <input
              type="text"
              name="question"
              className="form-control m-2"
              placeholder="Enter a Question"
              value={this.state.question}
              onChange={this.handleInput}
            />
            <p>Answers:</p>
            {renderAnswers}

            <div className="m-2">
              <button
                className="btn btn-success m-2"
                onClick={this.submitAndContinue}
              >
                Add More Question
              </button>
              <button className="btn btn-success m-2" onClick={this.saveQuiz}>
                submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QuizAdd;
