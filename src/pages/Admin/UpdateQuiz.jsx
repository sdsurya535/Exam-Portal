import { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import quizService from "../../services/Quiz";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import axiosInstance from "../../services/intercepter";
import BaseUrl from "../../api/BaseUrl";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const UpdateQuiz = () => {
  const { qid } = useParams();
  const { handleSubmit, setValue,reset } = useForm();
  // const [option, setOption] = useState("");

  const getAllCategories = () => {
    axiosInstance.get(`${BaseUrl}/category/`).then(
      (response) => {
        console.log(response.data);
        setCategory(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [questions, setQuestions] = useState("");
  const [active, setActive] = useState(false);
  const [optionId, setOptionId] = useState("");
  const [mainId, setMainId] = useState("");
  useEffect(() => {
    if (qid) {
      quizService.getQuizById(qid).then(
        (response) => {
          console.log(response.data);
          setMainId(response.data.qid);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setMaxMarks(response.data.maxMarks);
          setQuestions(response.data.numberOfQuestions);
          setActive(response.data.active);
          setOptionId(response.data.category.cid);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [qid]);

  function onSubmit() {
    const formattedData = {
      category: { cid: optionId },
      title,
      description,
      maxMarks,
      numberOfQuestions: questions,
      active,
      qid: mainId,
    };
    updateQuiz(formattedData);
    reset();
  }

  const updateQuiz = (data) => {
    quizService.updateQuiz(data).then(
      () => {
        Swal.fire({
          title: "Update Successfully",
          icon: "success",
          confirmButtonText: "Ok",
          timer: "1500",
        });
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
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 card offset-md-1">
            <h1 className="text-center mt-2">ADD QUIZ</h1>
            <div className="card-body text-center">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  id="filled-basic"
                  label="Quiz Title"
                  className="w-10/12 mb-4"
                  variant="filled"
                  color="success"
                  value={title || ""}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setValue("title", e.target.value);
                  }}
                />
                <TextField
                  id="standard-multiline-static"
                  label="Quiz Description"
                  multiline
                  rows={8}
                  variant="filled"
                  className="w-10/12 mb-4"
                  color="success"
                  value={description || ""}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setValue("description", e.target.value);
                  }}
                />

                <div className="container">
                  <TextField
                    id="filled-basic"
                    label="Maximum Marks"
                    className=" mb-4 col-md-5 me-4"
                    variant="filled"
                    color="success"
                    value={maxMarks || ""}
                    onChange={(e) => {
                      setMaxMarks(e.target.value);
                      setValue("maxMarks", e.target.value);
                    }}
                  />
                  <TextField
                    id="filled-basic"
                    label="Number Questions"
                    className="col-md-5 mb-4"
                    variant="filled"
                    color="success"
                    value={questions || ""}
                    onChange={(e) => {
                      setQuestions(e.target.value);
                      setValue("numberOfQuestions", e.target.value);
                    }}
                  />
                </div>

                <div className="container text-left mb-4">
                  <Switch
                    checked={active}
                    className="ms-[4.4rem]"
                    color="success"
                    onChange={(e) => {
                      setActive(e.target.checked);
                      setValue("active", e.target.checked);
                    }}
                  />
                </div>

                <FormControl
                  variant="filled"
                  color="success"
                  className="w-10/12 mb-4"
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Categories
                  </InputLabel>
                  <Select
                    value={optionId}
                    className="text-left"
                    onChange={(e) => {
                      setOptionId(e.target.value);
                      setValue("cid", e.target.value);
                    }}
                  >
                    {category.map((items) => (
                      <MenuItem
                        key={items.cid}
                        defaultValue={items.title}
                        value={items.cid}
                      >
                        {items.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div className="container text-center">
                  <Button type="submit" variant="contained" color="success">
                    Update
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateQuiz;
