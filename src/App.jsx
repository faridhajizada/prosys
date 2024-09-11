import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Headers';
import Sidebar from './components/Sidebar';
import LessonForm from './components/LessonForm';
import StudentForm from './components/StudentForm';
import ExamForm from './components/ExamForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<LessonForm />} />
            <Route path="/lessons" element={<LessonForm />} />
            <Route path="/students" element={<StudentForm />} />
            <Route path="/exams" element={<ExamForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
