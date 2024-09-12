import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Headers";
import Sidebar from "./components/Sidebar/Sidebar";
import Loading from "./components/Loading/Loading";

const Lesson = lazy(() => import("./page/Lesson/Lesson"));
const Student = lazy(() => import("./page/Student/Student"));
const Exam = lazy(() => import("./page/Exam/Exam"));

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Student />} />
              <Route path="/lessons" element={<Lesson />} />
              <Route path="/students" element={<Student />} />
              <Route path="/exams" element={<Exam />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
