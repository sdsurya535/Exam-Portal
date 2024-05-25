import BaseUrl from "../api/BaseUrl";
import axiosInstance from "./intercepter";

export class QuestionService {
  getQuestions = (qid) => {
    return axiosInstance.get(`${BaseUrl}/question/quiz/all/${qid}`);
  };

  getQuestionsOfQuiz = (qid) => {
    return axiosInstance.get(`${BaseUrl}/question/quiz/${qid}`);
  };

  addQuestion = (data) => {
    return axiosInstance.post(`${BaseUrl}/question/`, data);
  };

  getQuestionById = (quesId) => {
    return axiosInstance.get(`${BaseUrl}/question/${quesId}`);
  };

  updateQuestion = (data) => {
    return axiosInstance.put(`${BaseUrl}/question/`, data);
  };

  deleteQuestion = (quesId) => {
    return axiosInstance.delete(`${BaseUrl}/question/${quesId}`);
  };

  evalQuiz = (questions) => {
    return axiosInstance.post(`${BaseUrl}/question/eval-quiz`,questions);
  };
}

const questionService = new QuestionService();

export default questionService;
