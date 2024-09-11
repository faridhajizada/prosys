import React from 'react'
import LessonList from './../../components/Lesson/LessonList'
import LessonForm from './../../components/Lesson/LessonForm'
import './Lesson.css'

function Lesson() {
  return (
    <div className="lesson-container">
    <div className="lesson-list">
      <LessonList />
    </div>
    <div className="lesson-form">
      <LessonForm />
    </div>
  </div>
  )
}

export default Lesson