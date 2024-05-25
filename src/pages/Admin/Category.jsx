import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TbCategoryFilled } from "react-icons/tb";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/intercepter";
import BaseUrl from "../../api/BaseUrl";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

import { useForm } from "react-hook-form";
import categoryService from "../../services/Category";

const Category = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
    addCategories(data);
    reset();
    handleClose();
  };

  const addCategories = (categories) => {
    categoryService.addCategory(categories).then(
      (response) => {
        console.log(response);
        setLoading(true);
        Swal.fire({
          title: "Added Successfully",
          icon: "success",
          confirmButtonText: "Ok",
          timer: "1000",
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "An Error Occurred",
          icon: "error",
          confirmButtonText: "Ok",
          timer: "1000",
        });
      }
    );
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const getAllCategories = () => {
    axiosInstance.get(`${BaseUrl}/category/`).then(
      (response) => {
        setCategories(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, [loading]);

  return (
    <>
      <Card>
        <CardContent>
          <h2 className="mb-10 text-center uppercase">All Categories</h2>

          {categories.length != null
            ? categories.map((item) => (
                <div key={item.cid}>
                  <Typography
                    variant="h5"
                    className="flex items-center text-green-800"
                    component="div"
                  >
                    <TbCategoryFilled className="me-3 text-yellow-700" />
                    {item.title}
                  </Typography>

                  <Typography className="mt-3 text-slate-600" sx={{ mb: 2.5 }}>
                    {item.description}
                  </Typography>
                  <hr />
                </div>
              ))
            : "No Categories Available"}
          <div className="container text-center">
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="success"
            >
              Add Category
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        PaperProps={{ component: "form", onSubmit: handleSubmit(onSubmit) }}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            {...register("title")}
            required
            margin="dense"
            sx={{ mb: 2.5 }}
            id="title"
            label="Category Title"
            type="text"
            maxWidth={"lg"}
            fullWidth
            variant="outlined"
            color="secondary"
          />
          <br />
          <TextField
            required
            margin="dense"
            id="outlined-multiline-static"
            {...register("description")}
            label="Category Description"
            type="text"
            maxWidth={"lg"}
            rows={8}
            multiline
            fullWidth
            variant="filled"
            color="secondary"
          />
        </DialogContent>
        <DialogActions>
          <Button color="warning" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Category;
