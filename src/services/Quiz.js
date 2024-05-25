import BaseUrl from "../api/BaseUrl";
import axiosInstance from "./intercepter";

export class QuizService {
  getAllQuizzes = () => {
    return axiosInstance.get(`${BaseUrl}/quiz/`);
  };
  
  addQuiz = (data) => {
    return axiosInstance.post(`${BaseUrl}/quiz/`, data);
  };

  deleteQuiz = (qid) => {
    return axiosInstance.delete(`${BaseUrl}/quiz/${qid}`);
  };

  getQuizById = (qid) => {
    return axiosInstance.get(`${BaseUrl}/quiz/${qid}`);
  };

  updateQuiz = (data) => {
    return axiosInstance.put(`${BaseUrl}/quiz/`, data);
  };

  getQuizzesOfCategory = (cid) => {
    return axiosInstance.get(`${BaseUrl}/quiz/category/${cid}`);
  };

  getActiveQuizzes = () => {
    return axiosInstance.get(`${BaseUrl}/quiz/active`);
  };

  getActiveQuizzesOfCategory = (cid) => {
    return axiosInstance.get(`${BaseUrl}/quiz/active/${cid}`);
  };
}

const quizService = new QuizService();
export default quizService;
