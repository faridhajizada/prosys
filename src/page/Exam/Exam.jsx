import React from 'react';
import ExamList from './../../components/Exam/ExamList';
import ExamForm from './../../components/Exam/ExamForm';
import './Exam.css'; 

function Exam() {
  return (
    <div className="exam-container">
      <div className="exam-list">
        <ExamList />
      </div>
      <div className="exam-form">
        <ExamForm />
      </div>
    </div>
  );
}

export default Exam;
