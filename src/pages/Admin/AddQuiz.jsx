import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import axiosInstance from "../../services/intercepter";
import BaseUrl from "../../api/BaseUrl";
import quizService from "../../services/Quiz";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const AddQuiz = () => {
  const getAllCategories = () => {
    axiosInstance.get(`${BaseUrl}/category/`).then(
      (response) => {
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
  //   const category = [
  //     {
  //       cid: 34,
  //       title: "Programming",
  //     },
  //     {
  //       cid: 35,
  //       title: "Java Programming",
  //     },
  //   ];
  const { handleSubmit, control, register } = useForm();

  const onSubmit = (data) => {
    const formattedData = {
      category: { cid: data.cid },
      ...Object.entries(data)
        .filter(([key]) => key !== "cid")
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
    };
    console.log(formattedData);
    handleAdd(formattedData);
  };

  const handleAdd = (data) => {
    quizService.addQuiz(data).then(
      () => {
        Swal.fire({
          title: "Added Successfully",
          icon: "success",
          confirmButtonText: "Ok",
          timer: "1000",
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
                  {...register("title", { required: true })}
                />
                <TextField
                  id="standard-multiline-static"
                  label="Quiz Description"
                  multiline
                  rows={8}
                  variant="filled"
                  className="w-10/12 mb-4"
                  color="success"
                  {...register("description", { required: true })}
                />

                <div className="container">
                  <TextField
                    id="filled-basic"
                    label="Maximum Marks"
                    className=" mb-4 col-md-5 me-4"
                    variant="filled"
                    color="success"
                    {...register("maxMarks", { required: true })}
                  />
                  <TextField
                    id="filled-basic"
                    label="Number Questions"
                    className="col-md-5 mb-4"
                    variant="filled"
                    color="success"
                    {...register("numberOfQuestions", { required: true })}
                  />
                </div>

                <div className="container text-left mb-4">
                  <FormControlLabel
                    control={
                      <Controller
                        name="active"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Switch
                            className="ms-[4.4rem]"
                            color="success"
                            {...field}
                          />
                        )}
                      />
                    }
                    label="Publish Status"
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
                  <Controller
                    name="cid"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        className="text-left"
                        {...field}
                        value={field.value || ""}
                      >
                        {category.map((items) => (
                          <MenuItem key={items.cid} value={items.cid}>
                            {items.title}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

                <div className="container text-center">
                  <Button type="submit" variant="contained" color="success">
                    Add
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

export default AddQuiz;
