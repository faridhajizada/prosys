import React from 'react'
import StudentList from './../../components/Student/StudentList'
import StudentForm from './../../components/Student/StudentForm'
import './Student.css'



function Student() {
  return (
    <div className="student-container">
    <div className="student-list">
      <StudentList />
    </div>
    <div className="student-form">
      <StudentForm />
    </div>
  </div>
  )
}

export default Student