import React, { useState } from "react";
import { useAddLessonMutation } from "./../../api/lessonApi";

const LessonForm = React.memo(() => {
  const [lesson, setLesson] = useState({
    code: "",
    name: "",
    class: "",
    teacherFirstName: "",
    teacherLastName: "",
  });

  const [addLesson, { isLoading, error, isSuccess }] = useAddLessonMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "class" && value < 0) return; 
    setLesson((prevLesson) => ({
      ...prevLesson,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validLesson = {
      code: lesson.code.trim(),
      name: lesson.name.trim(),
      class: Number(lesson.class),
      teacherFirstName: lesson.teacherFirstName.trim(),
      teacherLastName: lesson.teacherLastName.trim(),
    };

    if (
      !validLesson.code ||
      !validLesson.name ||
      !validLesson.class ||
      !validLesson.teacherFirstName ||
      !validLesson.teacherLastName ||
      validLesson.class < 0
    ) {
      alert(
        "Please fill in all fields correctly and ensure class is non-negative."
      );
      return;
    }

    try {
      await addLesson(validLesson).unwrap();
      setLesson({
        code: "",
        name: "",
        class: "",
        teacherFirstName: "",
        teacherLastName: "",
      });
    } catch (err) {
      console.error("Failed to save the lesson: ", err);
      alert(`Error: ${err.data?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="code"
            className="form-control"
            placeholder="Lesson Code"
            value={lesson.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Lesson Name"
            value={lesson.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            name="class"
            className="form-control"
            placeholder="Class"
            value={lesson.class}
            onChange={handleChange}
            required
            min="0"
            max="12"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="teacherFirstName"
            className="form-control"
            placeholder="Teacher's First Name"
            value={lesson.teacherFirstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="teacherLastName"
            className="form-control"
            placeholder="Teacher's Last Name"
            value={lesson.teacherLastName}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register Lesson"}
        </button>
        {isSuccess && (
          <div className="alert alert-success mt-3">
            Lesson registered successfully!
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">
            Failed to register lesson.{" "}
            {error.data?.message || "Please try again."}
          </div>
        )}
      </form>
    </div>
  );
});

export default LessonForm;
