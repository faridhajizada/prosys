import React, { useCallback, useState } from "react";
import {
  useGetExamQuery,
  useDeleteExamMutation,
  useEditExamMutation,
} from "./../../api/examApi";

const ExamList = React.memo(() => {
  const { data = [], error, isLoading, refetch } = useGetExamQuery(undefined, {
    refetchOnMountOrArgChange: true, 
  });
  const [deleteExam] = useDeleteExamMutation();
  const [editExam] = useEditExamMutation();

  const [editingExam, setEditingExam] = useState(null);
  const [examData, setExamData] = useState({});

  const handleDelete = useCallback(
    async (lessonCode, studentNumber) => {
      if (window.confirm("Are you sure you want to delete this exam?")) {
        try {
          await deleteExam({ lessonCode, studentNumber }).unwrap();
          console.log('Exam deleted successfully');
          refetch();
        } catch (error) {
          console.error("Failed to delete the exam: ", error);
          alert("Failed to delete the exam. Please try again.");
        }
      }
    },
    [deleteExam, refetch]
  );

  const handleEdit = useCallback((exam) => {
    setEditingExam({
      lessonCode: exam.lessonCode,
      studentNumber: exam.studentNumber,
    });
    setExamData({ ...exam });
  }, []);

  const handleSave = useCallback(async () => {
    console.log('Saving examData:', examData);
    try {
      await editExam(examData).unwrap();
      console.log('Exam updated successfully');
      setEditingExam(null);
      refetch().then(() => console.log('Data refetched'));
    } catch (error) {
      console.error("Failed to edit the exam: ", error);
      alert("Failed to edit the exam. Please try again.");
    }
  }, [editExam, examData, refetch]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log('Changing:', name, 'to:', value);
    setExamData((prevData) => ({ ...prevData, [name]: value }));
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
        <h2 className="mb-4">Exam List</h2>
        <div className="alert alert-info" role="alert">
          No exams found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Exam List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Lesson Code</th>
            <th>Student Number</th>
            <th>Date</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((exam) => (
              <tr key={`${exam.lessonCode}-${exam.studentNumber}`}>
                <td>
                  {editingExam &&
                  editingExam.lessonCode === exam.lessonCode &&
                  editingExam.studentNumber === exam.studentNumber ? (
                    <input
                      type="text"
                      name="lessonCode"
                      value={examData.lessonCode}
                      onChange={handleChange}
                      readOnly
                    />
                  ) : (
                    exam.lessonCode
                  )}
                </td>
                <td>
                  {editingExam &&
                  editingExam.lessonCode === exam.lessonCode &&
                  editingExam.studentNumber === exam.studentNumber ? (
                    <input
                      type="text"
                      name="studentNumber"
                      value={examData.studentNumber}
                      onChange={handleChange}
                      readOnly
                    />
                  ) : (
                    exam.studentNumber
                  )}
                </td>
                <td>
                  {editingExam &&
                  editingExam.lessonCode === exam.lessonCode &&
                  editingExam.studentNumber === exam.studentNumber ? (
                    <input
                      type="date"
                      name="date"
                      value={examData.date}
                      onChange={handleChange}
                    />
                  ) : (
                    exam.date
                  )}
                </td>
                <td>
                  {editingExam &&
                  editingExam.lessonCode === exam.lessonCode &&
                  editingExam.studentNumber === exam.studentNumber ? (
                    <input
                      type="number"
                      name="grade"
                      value={examData.grade}
                      onChange={handleChange}
                      min="0"
                      max="12"
                    />
                  ) : (
                    exam.grade
                  )}
                </td>
                <td>
                  {editingExam &&
                  editingExam.lessonCode === exam.lessonCode &&
                  editingExam.studentNumber === exam.studentNumber ? (
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
                        onClick={() => setEditingExam(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(exam)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleDelete(exam.lessonCode, exam.studentNumber)
                        }
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
                No exams found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default ExamList;
