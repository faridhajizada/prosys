import React from "react";
import { useGetStudentsQuery } from "./../../api/studentApi";

function StudentList() {
  const { data, error, isLoading } = useGetStudentsQuery();

  if (isLoading) return <div className="text-center mt-4"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger" role="alert">Error: {error.message}</div>;

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
          {data.map((student, idx) => (
            <tr key={idx}>
              <td>{student.number}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.class}</td>
              <td className="d-flex">
                <button type="button" className="btn btn-warning btn-sm me-2">Edit</button>
                <button type="button" className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
