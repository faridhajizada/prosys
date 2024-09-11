import React, { useState } from 'react';
import { useAddStudentMutation } from './../../api/studentApi';

function StudentForm() {
  const [student, setStudent] = useState({
    number: '',
    firstName: '',
    lastName: '',
    class: '', 
  });

  const [addStudent, { isLoading, error, isSuccess }] = useAddStudentMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validStudent = {
      number: Number(student.number),
      firstName: student.firstName.trim(),
      lastName: student.lastName.trim(),
      class: Number(student.class),
    };

    if (!validStudent.number || !validStudent.firstName || !validStudent.lastName || !validStudent.class) {
      alert('Please fill in all fields correctly.');
      return;
    }

    try {
      await addStudent(validStudent).unwrap();
      setStudent({ number: '', firstName: '', lastName: '', class: '' });
    } catch (err) {
      console.error('Failed to save the student: ', err);
      alert(`Error: ${err.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="number"
            name="number"
            className="form-control"
            placeholder="Number"
            value={student.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First Name"
            value={student.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last Name"
            value={student.lastName}
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
            value={student.class}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Student'}
        </button>
        {isSuccess && (
          <div className="alert alert-success mt-3">
            Student registered successfully!
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3">
            Failed to register student. {error.data?.message || 'Please try again.'}
          </div>
        )}
      </form>
    </div>
  );
}

export default StudentForm;
