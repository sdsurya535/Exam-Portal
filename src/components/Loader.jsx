import { CircularProgress } from "@mui/material";

const Loader = ({ show }) => {
  return (
    show && (
      <div className="text-center">
        <CircularProgress color="success" size={70}/>
        <h5 className="text-green-700">Loading...</h5>
      </div>
    )
  );
};

export default Loader;
