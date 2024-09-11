import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Header from "./components/Header/Headers";
import Sidebar from "./components/Sidebar/Sidebar";

const Lesson = lazy(() => import("./page/Lesson"));
const Student = lazy(() => import("./page/Student"));
const Exam = lazy(() => import("./page/Exam"));

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Lesson />} />
            <Route path="/lessons" element={<Lesson />} />
            <Route path="/students" element={<Student />} />
            <Route path="/exams" element={<Exam />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
