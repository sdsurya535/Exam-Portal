import { Button, IconButton, TextField, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../services/auth";
import BaseUrl from "../../api/BaseUrl";
import { useSelector, useDispatch } from "react-redux";
import { toggleType } from "../../store/passSlice";
import axios from "axios";
import { closeSnack, openSnack } from "../../store/snackSlice";

const Login = () => {
  const { type } = useSelector((state) => state.pass);
  const { initialVal, severity, message } = useSelector((state) => state.snack);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      dispatch(toggleType({ type: "text" }));
    } else {
      dispatch(toggleType({ type: "password" }));
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    generateToken(data);

    reset();
  };

  const handleClose = () => {
    dispatch(closeSnack());
  };

  const generateToken = (datas) => {
    axios.post(`${BaseUrl}/generate-token`, datas).then(
      (response) => {
        
        authService.loginUser(response.data.token);
        authService.getCurrentUser().then((mdata) => {
          authService.setUser(mdata.data);
          if (
            authService.getUserRole() == "ADMIN" &&
            authService.isLoggedIn()
          ) {
            navigate("/protected/admin");
          } else if (
            authService.getUserRole() == "NORMAL" &&
            authService.isLoggedIn()
          ) {
            navigate("/protected/user-dashboard/0");
          }
        });
      },
      (error) => {
        console.log(error);
        dispatch(
          openSnack({
            severity: "error",
            message: "Invalid username and password",
          })
        );
      }
    );
  };

  return (
    <>
      <div className="container mb-14">
        <div className="row mt-3">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-[2.8rem] text-center uppercase">
              <img
                src="images/pngegg.png"
                width="140px"
                height="140px"
                alt="no"
                className="me-auto ms-auto pb-2"
              />
              Login Here
            </h1>

            <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
              <div className="mb-3 mt-4 w-full">
                <TextField
                  id="outlined-basic"
                  label="Username"
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
                  label="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
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

                <div className="mt-3 mb-[16.05rem]">
                  <Button
                    type="submit"
                    variant="contained"
                    className=" w-[50%] shadow-sm"
                    color="success"
                  >
                    Login
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
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
