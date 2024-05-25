import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useParams } from "react-router-dom";
import questionService from "../../services/Question";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const AddQuestion = () => {
  const { qid, title } = useParams();

  const [content, setContent] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  const { handleSubmit, setValue, reset } = useForm();

  const onSubmit = () => {
    const formattedData = {
      quiz: { qid: qid },
      content,
      option1,
      option2,
      option3,
      option4,
      answer,
    };
    console.log(formattedData);
    addQuestion(formattedData);
    reset();
  };

  const addQuestion = (data) => {
    questionService.addQuestion(data).then(
      () => {
        Swal.fire({
          title: "Added Successfully",
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
                ADD QUESTIONS TO{" "}
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
                  rows={8}
                  onChange={(e) => {
                    setContent(e.target.value);
                    setValue("content", e.target.value);
                  }}
                /> */}
                <div className="mt-3 mb-4">
                  <CKEditor
                    editor={ClassicEditor}
                    data={""}
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
                    Add question
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

export default AddQuestion;
