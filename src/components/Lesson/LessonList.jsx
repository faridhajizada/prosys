import React, { useState, useCallback } from "react";
import {
  useGetLessonQuery,
  useDeleteLessonMutation,
  useEditLessonMutation,
} from "./../../api/lessonApi";

const LessonList = React.memo(() => {
  const { data = [], error, isLoading, refetch } = useGetLessonQuery();
  const [deleteLesson] = useDeleteLessonMutation();
  const [editLesson] = useEditLessonMutation();

  const [editingLesson, setEditingLesson] = useState(null);
  const [lessonData, setLessonData] = useState({});

  const handleDelete = useCallback(
    async (lessonCode) => {
      if (window.confirm("Are you sure you want to delete this lesson?")) {
        try {
          await deleteLesson(lessonCode).unwrap();
          refetch();
        } catch (error) {
          console.error("Failed to delete the lesson: ", error);
          alert("Failed to delete the lesson. Please try again.");
        }
      }
    },
    [deleteLesson, refetch]
  );
  
  const handleEdit = useCallback(async (lesson) => {
    setEditingLesson(lesson.code);
    setLessonData({ ...lesson });
  }, []);
  

  const handleSave = useCallback(async () => {
    try {
      await editLesson(lessonData).unwrap();
      setEditingLesson(null);
    } catch (error) {
      console.error("Failed to edit the lesson: ", error);
      alert("Failed to edit the lesson. Please try again.");
    }
  }, [editLesson, lessonData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setLessonData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching lessons:", error);
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Failed to fetch lessons. Please try again later.
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Lesson List</h2>
        <div className="alert alert-info" role="alert">
          No lessons found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lesson List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Lesson Code</th>
            <th>Lesson Name</th>
            <th>Class</th>
            <th>Teacher First Name</th>
            <th>Teacher Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((lesson) => (
            <tr key={lesson.code}>
              <td>{lesson.code}</td>
              <td>
                {editingLesson === lesson.code ? (
                  <input
                    type="text"
                    name="name"
                    value={lessonData.name}
                    onChange={handleChange}
                  />
                ) : (
                  lesson.name
                )}
              </td>
              <td>
                {editingLesson === lesson.code ? (
                  <input
                    type="number"
                    name="class"
                    value={lessonData.class}
                    onChange={handleChange}
                    min="0"
                  />
                ) : (
                  lesson.class
                )}
              </td>
              <td>
                {editingLesson === lesson.code ? (
                  <input
                    type="text"
                    name="teacherFirstName"
                    value={lessonData.teacherFirstName}
                    onChange={handleChange}
                  />
                ) : (
                  lesson.teacherFirstName
                )}
              </td>
              <td>
                {editingLesson === lesson.code ? (
                  <input
                    type="text"
                    name="teacherLastName"
                    value={lessonData.teacherLastName}
                    onChange={handleChange}
                  />
                ) : (
                  lesson.teacherLastName
                )}
              </td>
              <td>
                {editingLesson === lesson.code ? (
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-success btn-sm me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingLesson(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(lesson)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(lesson.code)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default LessonList;
