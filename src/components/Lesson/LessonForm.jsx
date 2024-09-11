import React, { useState } from 'react';

function LessonForm() {
  const [lesson, setLesson] = useState({ code: '', name: '', grade: '', teacherFirstName: '', teacherLastName: '' });

  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lesson Registered: ', lesson);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register Lesson</h2>
      <input type="text" name="code" placeholder="Code" value={lesson.code} onChange={handleChange} required />
      <input type="text" name="name" placeholder="Name" value={lesson.name} onChange={handleChange} required />
      <input type="number" name="grade" placeholder="Grade" value={lesson.grade} onChange={handleChange} required />
      <input type="text" name="teacherFirstName" placeholder="Teacher's First Name" value={lesson.teacherFirstName} onChange={handleChange} required />
      <input type="text" name="teacherLastName" placeholder="Teacher's Last Name" value={lesson.teacherLastName} onChange={handleChange} required />
      <button type="submit">Register Lesson</button>
    </form>
  );
}

export default LessonForm;
