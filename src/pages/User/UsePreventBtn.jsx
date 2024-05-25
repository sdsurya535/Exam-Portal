import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsePreventBtn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; 
    };

    const handleBackButton = (event) => {
      event.preventDefault();
      navigate(null, document.title, window.location.href); 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.history.pushState(null, "", window.location.pathname); // Clear history
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);
};

export default UsePreventBtn;
