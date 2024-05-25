import { useNavigate, useParams } from "react-router-dom";
import UsePreventBtn from "./UsePreventBtn";
import questionService from "../../services/Question";
import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import { Button, CircularProgress } from "@mui/material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const StartQuiz = () => {
  UsePreventBtn();
  const { qid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [attempted, setAttempted] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [marksGot, setMarksGot] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const intervalId = useRef(null);
  const timerFinished = useRef(false);

  const startTimer = () => {
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId.current);
          timerFinished.current = true;
          const latestQuestions = questions; // Ensure this is up-to-date

          console.log(
            "Timer reaching zero, current state of questions:",
            latestQuestions
          );
          handleTimerFinish();
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);
  };

  const getFormattedTime = () => {
    let mm = Math.floor(timer / 60);
    let ss = timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  };
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await questionService.getQuestionsOfQuiz(qid);
        setQuestions(response.data);
        setTimer(response.data.length * 1 * 60);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionIndex, selectedOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].givenAnswer = selectedOption;
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    console.log(questions); // Log the questions state

    if (questions.length > 0) {
      startTimer();
    }
    return () => {
      clearInterval(intervalId.current); // Clear timer when component unmounts
    };
  }, [questions]);

  const handleTimerFinish = () => {
    if (!isSubmit && timerFinished.current) {
      evalQuiz();
      setIsSubmit(true);
    }
  };
  const handleSubmitQuiz = () => {
    Swal.fire({
      title: "Do you want to Submit the Quiz?",
      showCancelButton: true,
      confirmButtonText: "Submit",
      icon: "info",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmit(true);

        evalQuiz();
      }
    });
  };

  const evalQuiz = () => {
    questionService.evalQuiz(questions).then(
      (response) => {
        console.log(response.data);
        setAttempted(response.data.attempted);
        setCorrectAnswers(response.data.correctAnswer);
        setMarksGot(Number(response.data.marksGot).toFixed());
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const navigateHome = () => {
    navigate("/protected/user-dashboard/0");
  };

  return (
    <>
      {!isSubmit && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <div className="card mt-[8.49rem]">
                <div className="card-body">
                  <h5 className="fw-bold">Instructions</h5>
                  <ul className="list-disc">
                    <li className="text-justify list-item">
                      Don&apos;t refresh the page either the questions will
                      going to reset{" "}
                    </li>
                    <li>Don&apos;t switch the tabs</li>
                    <li>Don&apos;t minimize the window</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              {questions.length != 0 && (
                <h2 className="mt-5">
                  On Going Quiz <b>{questions[0].quiz.title}</b>
                </h2>
              )}

              {questions.map((items, index) => (
                <div key={items.quesId} className="card mt-5 mb-5 shadow-sm">
                  <div className="card-body">
                    <p className="flex">
                      <b>Q {index + 1})</b>
                      <span className="ms-1"> {parse(items.content)}</span>
                    </p>
                    <hr className="font-bold" />
                    <div className="row mt-2 mb-3">
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={index}
                            value={items.option1}
                            checked={items.givenAnswer === items.option1}
                            onChange={() =>
                              handleOptionChange(index, items.option1)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            {items.option1}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={index}
                            value={items.option2}
                            checked={items.givenAnswer === items.option2}
                            onChange={() =>
                              handleOptionChange(index, items.option2)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            {items.option2}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={index}
                            value={items.option3}
                            checked={items.givenAnswer === items.option3}
                            onChange={() =>
                              handleOptionChange(index, items.option3)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            {items.option3}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={index}
                            value={items.option4}
                            checked={items.givenAnswer === items.option4}
                            onChange={() =>
                              handleOptionChange(index, items.option4)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault1"
                          >
                            {items.option4}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {questions.length > 0 && (
                <div className="container text-center mb-10">
                  <Button
                    variant="contained"
                    onClick={handleSubmitQuiz}
                    color="primary"
                    className="fixed"
                  >
                    Submit Quiz
                  </Button>
                </div>
              )}
            </div>

            <div className="col-md-2 ">
              <div className="card mt-[8.49rem]">
                <div className="card-body">
                  <h5 className="card-title">Progress</h5>
                  <p className="card-text">
                    quiz will automatically submitted when timer reaches to 0:0
                  </p>
                  <div className="container text-center">
                    <h5>{getFormattedTime()}</h5>
                    <CircularProgress
                      variant="determinate"
                      value={(timer / (questions.length * 1 * 60)) * 100}
                      size={100}
                      color="success"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSubmit && (
        <div className="container text-center mt-5 mb-[23rem]">
          <div className="row">
            <div className="col-md-6 offset-3">
              <div className="card shadow-lg px-5 py-5 ">
                <h1>Quiz Results</h1>
                <div className="card-body bg-white">
                  <p className="text-2xl">
                    Total Questions Attempted: <b>{attempted}</b>
                  </p>
                  <p className="text-2xl">
                    Correct Answers: <b>{correctAnswers}</b>
                  </p>
                  <p className="text-2xl">
                    Marks Obtained: <b>{marksGot}</b>
                  </p>
                </div>
                <div className="container">
                  <Button
                    onClick={() => window.print()}
                    className="me-2"
                    color="success"
                    variant="contained"
                  >
                    Print
                  </Button>
                  <Button
                    onClick={navigateHome}
                    variant="contained"
                    color="warning"
                  >
                    Home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StartQuiz;
