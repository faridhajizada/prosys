import React, { useState } from "react";
import { useAddExamMutation } from "./../../api/examApi";

function ExamForm() {
  const [exam, setExam] = useState({
    lessonCode: "",
    studentNumber: "",
    date: "",
    grade: "",
  });

  const [addExam, { isLoading, error }] = useAddExamMutation();
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exam.lessonCode) {
      setFormError("Lesson Code is required.");
      return;
    }

    if (!exam.studentNumber) {
      setFormError("Student Number is required.");
      return;
    }

    if (isNaN(exam.studentNumber) || parseInt(exam.studentNumber) <= 0) {
      setFormError("Student Number must be a positive number.");
      return;
    }

    try {
      await addExam(exam).unwrap();
      alert("Exam registered successfully!");
      setExam({
        lessonCode: "",
        studentNumber: "",
        date: "",
        grade: "",
      });
    } catch (err) {
      console.error("Failed to register exam: ", err);
      alert("Failed to register exam. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Exam</h2>

      {formError && (
        <div className="alert alert-danger" role="alert">
          {formError}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="lessonCode" className="form-label">
          Lesson Code
        </label>
        <input
          type="text"
          id="lessonCode"
          name="lessonCode"
          className="form-control"
          placeholder="Enter Lesson Code"
          value={exam.lessonCode}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="studentNumber" className="form-label">
          Student Number
        </label>
        <input
          type="number"
          id="studentNumber"
          name="studentNumber"
          className="form-control"
          placeholder="Enter Student Number"
          value={exam.studentNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="form-control"
          value={exam.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="grade" className="form-label">
          Grade
        </label>
        <input
          type="number"
          id="grade"
          name="grade"
          className="form-control"
          placeholder="Enter Grade"
          value={exam.grade}
          onChange={handleChange}
          required
          min="0"
          max="12"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register Exam"}
      </button>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          Failed to register exam. Please try again.
        </div>
      )}
    </form>
  );
}

export default ExamForm;
