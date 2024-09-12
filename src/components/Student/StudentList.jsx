import React, { useCallback, useState } from "react";
import {
  useGetStudentsQuery,
  useDeleteStudentMutation,
  useEditStudentMutation,
} from "./../../api/studentApi";

const StudentList = React.memo(() => {
  const { data = [], error, isLoading, refetch } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();
  const [editStudent] = useEditStudentMutation();

  const [editingStudent, setEditingStudent] = useState(null);
  const [studentData, setStudentData] = useState({});

  const handleDelete = useCallback(
    async (studentNumber) => {
      if (window.confirm("Are you sure you want to delete this student?")) {
        try {
          await deleteStudent(studentNumber).unwrap();
          refetch();
        } catch (error) {
          console.error("Failed to delete the student: ", error);
          alert("Failed to delete the student. Please try again.");
        }
      }
    },
    [deleteStudent, refetch]
  );

  const handleEdit = useCallback((student) => {
    setEditingStudent(student.number);
    setStudentData({ ...student });
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await editStudent(studentData).unwrap();
      setEditingStudent(null);
      refetch();
    } catch (error) {
      console.error("Failed to edit the student: ", error);
      alert("Failed to edit the student. Please try again.");
    }
  }, [editStudent, studentData, refetch]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "number" || name === "class") {
      if (value < 0) return;
    }
    setStudentData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  if (isLoading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Student List</h2>
        <div className="alert alert-info" role="alert">
          No students found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((student) => (
              <tr key={student.number}>
                <td>{student.number}</td>
                <td>
                  {editingStudent === student.number ? (
                    <input
                      type="text"
                      name="firstName"
                      value={studentData.firstName}
                      onChange={handleChange}
                    />
                  ) : (
                    student.firstName
                  )}
                </td>
                <td>
                  {editingStudent === student.number ? (
                    <input
                      type="text"
                      name="lastName"
                      value={studentData.lastName}
                      onChange={handleChange}
                    />
                  ) : (
                    student.lastName
                  )}
                </td>
                <td>
                  {editingStudent === student.number ? (
                    <input
                      type="number"
                      name="class"
                      value={studentData.class}
                      onChange={handleChange}
                      min="0"
                      max="12"
                    />
                  ) : (
                    student.class
                  )}
                </td>
                <td>
                  {editingStudent === student.number ? (
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
                        onClick={() => setEditingStudent(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(student.number)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default StudentList;
