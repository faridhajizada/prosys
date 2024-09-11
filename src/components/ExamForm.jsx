import React, { useState } from "react";

function ExamForm() {
  const [exam, setExam] = useState({
    lessonCode: "",
    studentNumber: "",
    date: "",
    grade: "",
  });

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Registered: ", exam);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Exam</h2>
      <input
        type="text"
        name="lessonCode"
        placeholder="Lesson Code (char(3))"
        value={exam.lessonCode}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="studentNumber"
        placeholder="Student Number (number(5,0))"
        value={exam.studentNumber}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={exam.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="grade"
        placeholder="Grade (number(1,0))"
        value={exam.grade}
        onChange={handleChange}
        required
      />
      <button type="submit">Register Exam</button>
    </form>
  );
}

export default ExamForm;
