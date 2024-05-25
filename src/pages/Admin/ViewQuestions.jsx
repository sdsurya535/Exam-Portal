import { useNavigate, useParams } from "react-router-dom";
import questionService from "../../services/Question";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import parse from 'html-react-parser';

const ViewQuestions = () => {
  const { qid, title } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  // const [index,setIndex] = useState("");

  const addQuestion = () => {
    navigate(`/protected/admin/add-question/${qid}/${title}`);
  };

  const updateQuestion = (quesId) => {
    navigate(`/protected/admin/update-questions/${title}/${qid}/${quesId}`);
  };

  const deleteQuestion = (quesId) => {
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
        questionService.deleteQuestion(quesId).then(
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
            setLoading(false);
          }
        );
      }
    });
  };

  const getAllQuestions = () => {
    questionService.getQuestions(qid).then(
      (response) => {
        setQuestions(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getAllQuestions();
  }, [loading]);

  return (
    <div>
      <h1 className="text-center mb-4">
        Questions of{" "}
        <span className="uppercase font-bold text-green-800">{title}</span>
      </h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 card">
            <div className="card-body">
              {questions.map((items, index) => (
                <div className="mb-9 mt-1" key={items.quesId}>
                  <h6 className="flex">
                    <span className="font-bold me-1">Q {index + 1}) </span>
                    {parse(items.content)}
                  </h6>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-6 mt-1">
                        <p>
                          <b>a)</b> {items.option1}
                        </p>
                        <p>
                          <b>b)</b> {items.option2}
                        </p>
                      </div>
                      <div className="col-md-6 mt-1">
                        <p>
                          <b>c)</b> {items.option3}
                        </p>
                        <p>
                          <b>d)</b> {items.option4}
                        </p>
                      </div>
                      <hr />
                      <div>
                        <h6>
                          <b>Correct Answer : </b>{" "}
                          <span className="text-green-600">
                            &quot;{items.answer}&quot;
                          </span>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="text-left ms-3">
                    <Button
                      onClick={() => updateQuestion(items.quesId)}
                      variant="text"
                      color="secondary"
                    >
                      update
                    </Button>
                    <Button
                      onClick={() => deleteQuestion(items.quesId)}
                      color="warning"
                      variant="text"
                    >
                      delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container text-center mt-3">
            <button
              onClick={addQuestion}
              className="btn uppercase fw-bold btn-success"
            >
              Add new questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuestions;
