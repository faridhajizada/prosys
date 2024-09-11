import React, { useState } from 'react';

function StudentForm() {
  const [student, setStudent] = useState({ number: '', firstName: '', lastName: '', grade: '' });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Student Registered: ', student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Student</h2>
      <input type="number" name="number" placeholder="Number " value={student.number} onChange={handleChange} required />
      <input type="text" name="firstName" placeholder="First Name " value={student.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name " value={student.lastName} onChange={handleChange} required />
      <input type="number" name="grade" placeholder="Grade " value={student.grade} onChange={handleChange} required />
      <button type="submit">Register Student</button>
    </form>
  );
}

export default StudentForm;
