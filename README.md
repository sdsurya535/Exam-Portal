# Exam Portal Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [Backend Setup](#backend-setup)
    - [Spring Boot](#spring-boot)
    - [Spring Security](#spring-security)
    - [JWT Authentication](#jwt-authentication)
    - [REST API](#rest-api)
4. [Frontend Setup](#frontend-setup)
    - [React](#react)
    - [Redux Toolkit](#redux-toolkit)
    - [Axios](#axios)
    - [Tailwind CSS](#tailwind-css)
    - [Material UI React](#material-ui-react)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Conclusion](#conclusion)

## Introduction
This documentation provides an overview and setup guide for the Exam Portal project. The project is a full-stack application developed using Spring Boot for the backend and React for the frontend. It includes features such as JWT authentication and a RESTful API for secure and efficient communication between the client and server.

## Technologies Used

### Backend
- **Spring Boot**
- **Spring Security**
- **JWT Authentication**
- **REST API**

### Frontend
- **React**
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS**
- **Material UI React**

## Backend Setup

### Spring Boot
Spring Boot is the framework used for building the backend of the application. It simplifies the development of Java applications by providing a robust ecosystem and a set of conventions for building scalable web applications.

### Spring Security
Spring Security is used to handle authentication and authorization in the application. It provides comprehensive security services for Java applications and ensures that only authorized users can access certain endpoints.

### JWT Authentication
JWT (JSON Web Token) is used for securing the API endpoints. It involves generating a token upon successful login, which is then used for subsequent requests to verify the user's identity and permissions.

### REST API
The backend exposes a set of RESTful endpoints to be consumed by the frontend. These endpoints handle various operations such as user authentication, fetching exam data, submitting answers, and more.

## Frontend Setup

### React
React is a JavaScript library for building user interfaces. It is used to develop the frontend of the Exam Portal, providing a responsive and interactive user experience.

### Redux Toolkit
Redux Toolkit is used for state management in the application. It simplifies the process of managing global state and makes it easier to handle complex state interactions.

### Axios
Axios is a promise-based HTTP client used for making API requests from the frontend to the backend. It is used to fetch data, send data, and handle responses from the server.

### Tailwind CSS
Tailwind CSS is a utility-first CSS framework used for styling the frontend components. It allows for rapid UI development with a consistent design system.

### Material UI React
Material UI is a popular React UI framework that provides pre-designed components and styles. It is used to enhance the user interface and provide a professional look and feel.

## Running the Application

### Backend
1. Clone the repository.
2. Navigate to the backend directory.
3. Configure the `application.properties` file with the necessary database and JWT settings.
4. Build and run the Spring Boot application using:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend
1. Clone the repository.
2. Navigate to the frontend directory.
3. Install the dependencies using:
   ```bash
   npm install
   ```
4. Start the React application using:
   ```bash
   npm start
   ```

## API Endpoints
The following are some of the key API endpoints available in the application:

- **Authentication**
  - `POST /api/auth/login`: Authenticate a user and return a JWT token.
  - `POST /api/auth/register`: Register a new user.

- **Exam Management**
  - `GET /api/exams`: Fetch a list of available exams.
  - `GET /api/exams/{id}`: Fetch details of a specific exam.
  - `POST /api/exams`: Create a new exam.
  - `PUT /api/exams/{id}`: Update an existing exam.
  - `DELETE /api/exams/{id}`: Delete an exam.

- **Question Management**
  - `GET /api/exams/{examId}/questions`: Fetch questions for a specific exam.
  - `POST /api/exams/{examId}/questions`: Add a new question to an exam.
  - `PUT /api/exams/{examId}/questions/{questionId}`: Update a question.
  - `DELETE /api/exams/{examId}/questions/{questionId}`: Delete a question.

- **Submission**
  - `POST /api/exams/{examId}/submit`: Submit answers for an exam.

## Conclusion
This documentation provides a comprehensive guide to setting up and running the Exam Portal application. By following the steps outlined above, developers can get the application up and running quickly and understand the core technologies and features used in the project.
