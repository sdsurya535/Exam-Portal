import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/SignUp/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import AdminDashBoard from "./pages/Admin/AdminDashBoard.jsx";
import UserDashboard from "./pages/User/UserDashboard.jsx";
import Protected from "./security/Protected.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";
import ContactUs from "./pages/Contact/ContactUs.jsx";
import Profile from "./pages/Admin/Profile.jsx";
import Admin from "./pages/AdminPage/Admin.jsx";
import Normal from "./pages/NormalPage/Normal.jsx";
import NotFound from "./pages/Error/NotFound.jsx";
import Category from "./pages/Admin/Category.jsx";
import Quizzes from "./pages/Admin/Quizzes.jsx";
import AddQuiz from "./pages/Admin/AddQuiz.jsx";
import UpdateQuiz from "./pages/Admin/UpdateQuiz.jsx";
import ViewQuestions from "./pages/Admin/ViewQuestions.jsx";
import AddQuestion from "./pages/Admin/AddQuestion.jsx";
import UpdateQuestion from "./pages/Admin/UpdateQuestion.jsx";
import UserProfile from "./pages/User/UserProfile.jsx";
import LoadQuiz from "./pages/User/LoadQuiz.jsx";
import Instructions from "./pages/User/Instructions.jsx";
import StartQuiz from "./pages/User/StartQuiz.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />

      <Route path="/protected" element={<Protected />}>
        <Route
          path="admin"
          element={
            <Admin>
              <AdminDashBoard />
            </Admin>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="categories" element={<Category />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="add-quiz" element={<AddQuiz />} />
          <Route path="update-quiz/:qid" element={<UpdateQuiz />} />
          <Route
            path="view-questions/:qid/:title"
            element={<ViewQuestions />}
          />
          <Route path="add-question/:qid/:title" element={<AddQuestion />} />
          <Route
            path="update-questions/:title/:qid/:quesId"
            element={<UpdateQuestion />}
          />
        </Route>

        <Route
          path="user-dashboard"
          element={
            <Normal>
              <UserDashboard />
            </Normal>
          }
        >
          <Route path=":qid" element={<LoadQuiz />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="instruction/:qid" element={<Instructions />} />
        </Route>
        <Route path="start/:qid" element={<StartQuiz />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
