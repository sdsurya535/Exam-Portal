import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import quizService from "../../services/Quiz";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Quizzes = () => {
  //   const quizzes = [
  //     {
  //       qid: 23,
  //       title: "Java Programming",
  //       description:
  //         "It is a high-level programming language that used to build web and android applications",
  //       maxMarks: "50",
  //       numberOfQuestions: "50",
  //       active: "",
  //       category: {
  //         title: "Programming",
  //       },
  //     },
  //     {
  //       qid: 25,
  //       title: "Current Affairs Questions",
  //       description:
  //         "It is used to increase our general knowledge and also develops to change of mindsets",
  //       maxMarks: "50",
  //       numberOfQuestions: "50",
  //       active: "",
  //       category: {
  //         title: "Current Affairs",
  //       },
  //     },
  //   ];
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateQuiz = (qid) => {
    navigate(`/protected/admin/update-quiz/${qid}`);
  };

  const showQuestions = (qid, title) => {
    navigate(`/protected/admin/view-questions/${qid}/${title}`);
  };

  const deleteQuiz = (qid) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        quizService.deleteQuiz(qid).then(
          () => {
            Swal.fire({
              title: "Deleted Successfully",
              icon: "success",
              confirmButtonText: "Ok",
              timer: "1000",
            });
            setLoading(true);
          },
          () => {
            Swal.fire({
              title: "An Error Occurred",
              icon: "error",
              confirmButtonText: "Ok",
              timer: "1000",
            });
          }
        );
      }
    });
  };

  const getQuizzes = () => {
    quizService.getAllQuizzes().then(
      (response) => {
        setQuizzes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getQuizzes();
  }, [loading]);

  return (
    <div>
      {quizzes.length != null &&
        quizzes.map((items) => (
          <Card key={items.qid} className="mt-8">
            <CardContent>
              <Grid container alignItems="center">
                <Grid item className="pb-3 me-2">
                  <Avatar src="/images/manual.png" />
                </Grid>
                <Grid item>
                  <Typography color={"green"} variant="h5">
                    {items.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {items.category.title}
                  </Typography>
                </Grid>
              </Grid>

              <Typography className="text-yellow-600 font-bold ms-2 mt-1">
                {items.description}
              </Typography>

              <CardActions className="mt-1">
                <Button
                  onClick={() => showQuestions(items.qid, items.title)}
                  variant="contained"
                  color="secondary"
                >
                  Questions
                </Button>
                <Button variant="outlined" color="secondary">
                  Max Marks: {items.maxMarks}
                </Button>
                <Button variant="outlined" color="secondary">
                  Questions: {items.numberOfQuestions}
                </Button>
                <Button
                  onClick={() => updateQuiz(items.qid)}
                  variant="contained"
                  color="secondary"
                >
                  Update
                </Button>
                <Button variant="contained" color="secondary">
                  Attempts
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => deleteQuiz(items.qid)}
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}

      <div className="container text-center mt-5">
        <Button
          onClick={() => navigate("/protected/admin/add-quiz")}
          variant="contained"
          color="success"
        >
          Add Quizz
        </Button>
      </div>
    </div>
  );
};

export default Quizzes;
