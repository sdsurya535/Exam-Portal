import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useParams } from "react-router-dom";
import questionService from "../../services/Question";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const UpdateQuestion = () => {
  const { quesId, qid, title } = useParams();

  const [content, setContent] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const getQuestion = () => {
    questionService.getQuestionById(quesId).then(
      (response) => {
        setContent(response.data.content);
        setOption1(response.data.option1);
        setOption2(response.data.option2);
        setOption3(response.data.option3);
        setOption4(response.data.option4);
        setAnswer(response.data.answer);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    getQuestion();
  }, []);

  const { handleSubmit, setValue } = useForm();

  const onSubmit = () => {
    const formattedData = {
      quiz: { qid: qid },
      quesId: Number(quesId),
      content,
      option1,
      option2,
      option3,
      option4,
      answer,
    };
    updateQuestion(formattedData);
  };

  const updateQuestion = (data) => {
    questionService.updateQuestion(data).then(
      () => {
        Swal.fire({
          title: "Updated Successfully",
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
          timer: "1500",
        });
      }
    );
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-1 card shadow-lg">
            <div className="card-body">
              <h1 className="text-center uppercase">
                UPDATE QUESTIONS OF{" "}
                <span className="font-bold text-green-700">
                  &quot;{title}&quot;
                </span>
              </h1>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* <TextField
                  required
                  id="standard-basic"
                  label="Question Content"
                  variant="standard"
                  className="w-[100%] mb-5 mt-4"
                  color="success"
                  multiline
                  value={content || ""}
                  rows={8}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setValue("content", e.target.value);
                  }}
                /> */}

                <div className="mt-3 mb-4">
                  <CKEditor
                    editor={ClassicEditor}
                    data={content || ""}
                    config={{
                    placeholder: 'Question Content'
                  }}
                    onChange={(event, editor) => {
                      const content = editor.getData();
                      setContent(content);
                      setValue("content", content);
                    }}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <TextField
                      required
                      id="standard-basic"
                      label="Option 1"
                      variant="standard"
                      className="w-[100%] mb-4"
                      color="success"
                      value={option1 || ""}
                      onChange={(e) => {
                        setOption1(e.target.value);
                        setValue("option1", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      required
                      id="standard-basic"
                      label="Option 2"
                      variant="standard"
                      className="w-[100%] mb-4"
                      color="success"
                      value={option2 || ""}
                      onChange={(e) => {
                        setOption2(e.target.value);
                        setValue("option2", e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <TextField
                      required
                      id="standard-basic"
                      label="Option 3"
                      variant="standard"
                      className="w-[100%] mb-4"
                      color="success"
                      value={option3 || ""}
                      onChange={(e) => {
                        setOption3(e.target.value);
                        setValue("option3", e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      required
                      id="standard-basic"
                      label="Option 4"
                      variant="standard"
                      className="w-[100%] mb-4"
                      color="success"
                      value={option4 || ""}
                      onChange={(e) => {
                        setOption4(e.target.value);
                        setValue("option4", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <FormControl
                  variant="standard"
                  color="success"
                  className="w-[100%] mb-4"
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Answers
                  </InputLabel>
                  <Select
                    className="text-left"
                    value={answer || ""}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                      setValue("answer", e.target.value);
                    }}
                  >
                    {option1 !== "" && (
                      <MenuItem value={option1}>{option1}</MenuItem>
                    )}
                    {option2 !== "" && (
                      <MenuItem value={option2}>{option2}</MenuItem>
                    )}
                    {option3 !== "" && (
                      <MenuItem value={option3}>{option3}</MenuItem>
                    )}
                    {option4 !== "" && (
                      <MenuItem value={option4}>{option4}</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <div className="container text-center mt-3">
                  <Button type="submit" variant="contained" color="success">
                    Update Question
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateQuestion;
