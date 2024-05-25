import { Form } from "react-router-dom";
import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import BaseUrl from "../../api/BaseUrl";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { closeSnack, openSnack } from "../../store/snackSlice";
import { toggleType } from "../../store/passSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

const Signup = () => {
  const { initialVal, severity, message } = useSelector((state) => state.snack);
  const { type } = useSelector((state) => state.pass);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    if (type === "password") {
      dispatch(toggleType({ type: "text" }));
    } else {
      dispatch(toggleType({ type: "password" }));
    }
  };

  const handleClose = () => {
    setLoading(false);
    dispatch(closeSnack());
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    postData(data);
    reset();
    
  };

  const postData = (datas) => {
    axios.post(`${BaseUrl}/user/`, datas).then(
      (response) => {
        
        console.log(response);
        setLoading(false);
        dispatch(
          openSnack({ severity: "success", message: "Successfully Registered" })
        );
        
      },
      (error) => {
        console.log(error);
        setLoading(false);
        dispatch(
          openSnack({ severity: "error", message: "An Error Occurred" })
        );
      }
    );
  };
  return (
    <>
      <div className="container mb-[3.4rem]">
        <div className="row">
          <div className="card col-md-10 offset-md-1 border-0">
            <div className="card-body">
              <div className="container text-center"></div>
              <h1 className="text-center text-5xl uppercase">
                <img
                  src="images/signup.png"
                  width="170px"
                  height="170px"
                  alt="no"
                  className="me-auto ms-auto pb-3"
                />
                Register Here
              </h1>
              <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <div className="mb-3 mt-3">
                  <TextField
                    id="outlined-basic"
                    label={"First Name*"}
                    {...register("firstname", {
                      required: {
                        value: true,
                        message: "First name is required",
                      },
                      minLength: { value: 3, message: "min length is 3" },
                      maxLength: { value: 20, message: "max length is 20" },
                    })}
                    error={!!errors.firstname}
                    helperText={
                      errors.firstname ? errors.firstname.message : ""
                    }
                    variant="outlined"
                    color="success"
                    className={"w-25 me-1"}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Last Name*"
                    variant="outlined"
                    {...register("lastname", {
                      required: {
                        value: true,
                        message: "Last name is required",
                      },
                      maxLength: { value: 20, message: "max length is 20" },
                      minLength: { value: 2, message: "min length is 1" },
                    })}
                    error={!!errors.lastname}
                    helperText={errors.lastname ? errors.lastname.message : ""}
                    color="success"
                    className={"w-25"}
                  />
                </div>

                <div className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Username*"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "User name is required",
                      },
                      minLength: { value: 4, message: "Min length is 4" },
                    })}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ""}
                    variant="outlined"
                    color="success"
                    className={"w-6/12"}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Email*"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    variant="outlined"
                    color="success"
                    className={"w-6/12"}
                    type="email"
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Password*"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character",
                      },
                      minLength: {
                        value: 8,
                        message: "Min password length is 8 characters",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    variant="outlined"
                    color="success"
                    className={"w-6/12"}
                    type={type}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleToggle}>
                          {type == "password" ? (
                            <FaEye size={"25px"} />
                          ) : (
                            <FaEyeSlash size={"25px"} />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                </div>
                <div className="mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Mobile No.*"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "Mobile number is required",
                      },
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone ? errors.phone.message : ""}
                    variant="outlined"
                    color="success"
                    className={"w-6/12"}
                  />
                </div>

                <div className="mt-3">
                  <Button
                    type="submit"
                    variant="contained"
                    className=" w-[50%] shadow-sm"
                    color="success"
                  >
                    Register
                  </Button>
                  <Snackbar
                    open={initialVal}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity={severity}
                      variant="filled"
                      sx={{ width: "100%" }}
                    >
                      {message}
                    </Alert>
                  </Snackbar>
                  <Backdrop
                    sx={{
                      color: "#fff",
                      zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
