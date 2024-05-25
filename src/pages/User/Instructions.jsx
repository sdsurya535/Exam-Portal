import { useNavigate, useParams } from "react-router-dom";
import quizService from "../../services/Quiz";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Instructions = () => {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState({});
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    Swal.fire({
      title: "Do you want to Start the Quiz?",
      showCancelButton: true,
      confirmButtonText: "Start",
      icon: "info",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/protected/start/${quizId}`);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const getQuizzesbyId = () => {
    quizService.getQuizById(qid).then(
      (response) => {
        setQuiz(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getQuizzesbyId();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Card>
              <CardHeader
                title="Read the Instructions of this page carefully"
                subheader="One more step to go"
              />
              <CardContent>
                <h3>Exam {quiz.title}</h3>
                <Typography variant="body2" color="black">
                  {quiz.description}
                </Typography>
                <hr />
                <h2 className="uppercase ms-2 text-yellow-600">
                  Important Instructions
                </h2>

                <div className="mt-4 ms-4">
                  <li>This quiz only for paractice purpose</li>
                  <li>
                    You have to submit quiz within{" "}
                    <b>{quiz.numberOfQuestions * 2} Minutes</b>{" "}
                  </li>
                  <li>You can attempt the quiz any number of time.</li>
                  <li>
                    there are <b>{quiz.numberOfQuestions} questions</b> in this
                    quiz.
                  </li>
                  <li>
                    Maximum Mark of this quiz is <b>{quiz.maxMarks} marks.</b>{" "}
                  </li>
                  <li>
                    Each questions carries{" "}
                    <b>{quiz.maxMarks / quiz.numberOfQuestions} marks</b> No
                    negative marking for wrong ones.{" "}
                  </li>
                  <li>All questions is of MCQ Types.</li>
                </div>
                <hr />
                <h2 className="uppercase  ms-2 text-yellow-600">
                  Attempting Quiz
                </h2>
                <div className="mt-4 ms-4">
                  <li>
                    Click on the <b>Start Quiz</b> button to start the quiz.
                  </li>
                  <li>
                    The time will start at the moment when you click on the
                    Start Test button.
                  </li>
                  <li>
                    You can not resume this quiz, if interrupted due to any
                    reason.
                  </li>
                  <li>Scroll down to move to next question.</li>
                  <li>
                    Click on the Submit Quiz button on completion of the quiz.
                  </li>
                  <li>
                    Report of the test will automatically generated in the form
                    of PDF copy.
                  </li>
                </div>
              </CardContent>
              <CardActions>
                <div className=" container text-center">
                  <Button
                    onClick={() => handleStartQuiz(quiz.qid)}
                    variant="contained"
                    color="success"
                  >
                    Start Quiz
                  </Button>
                </div>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructions;
