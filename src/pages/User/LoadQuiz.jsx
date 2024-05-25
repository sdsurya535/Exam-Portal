import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizService from "../../services/Quiz";
import Card from "@mui/material/Card";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const LoadQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  // const [catQuiz,setCatQuiz] = useState({});
  const { qid } = useParams();
  const navigate = useNavigate();

  const goToInstruction = (quizId) => {
    navigate(`/protected/user-dashboard/instruction/${quizId}`);
  };

  const getQuizzes = () => {
    quizService.getActiveQuizzes().then(
      (response) => {
        setQuizzes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getQuizzesByCategory = () => {
    quizService.getActiveQuizzesOfCategory(qid).then(
      (response) => {
        setQuizzes(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (qid == 0) {
      getQuizzes();
    } else {
      getQuizzesByCategory();
    }
  }, [qid]);

  return (
    <div>
      <div className="container">
        <div className="row">
          {quizzes.length != 0 ? (
            quizzes.map((items) => (
              <div key={items.qid} className="col-md-4 mt-3">
                <Card sx={{ width: 378 }}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        <img src="/images/guide-book.png" />
                      </Avatar>
                    }
                    title={items.title}
                    subheader={items.category.title}
                  />
                  <CardContent>
                    <Typography
                      className="line-clamp-1"
                      variant="body2"
                      color="ThreeDDarkShadow"
                    >
                      {items.description}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button color="secondary">View</Button>
                    <Button
                      onClick={() => {
                        goToInstruction(items.qid);
                      }}
                      color="success"
                    >
                      Start
                    </Button>
                    <Button color="warning">
                      Questions: {items.numberOfQuestions}
                    </Button>
                    <Button color="warning">M.M: {items.maxMarks}</Button>
                  </CardActions>
                </Card>
              </div>
            ))
          ) : (
            <h2 className="text-center">No Quizzes in this Category</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadQuiz;
