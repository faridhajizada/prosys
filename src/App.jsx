import React from "react";
import Header from "./components/Headers";
import LessonForm from "./components/LessonForm";
import StudentForm from "./components/StudentForm";
import ExamForm from "./components/ExamForm";
import LessonList from "./components/LessonList";
import StudentList from "./components/StudentList";
import ExamList from "./components/ExamList";

function App() {
  return (
    <div>
      <Header />
      <div className="forms">
        <LessonForm />
        <StudentForm />
        <ExamForm />
      </div>
      <div className="lists">
        <LessonList />
        <StudentList />
        <ExamList />
      </div>
    </div>
  );
}

export default App;
