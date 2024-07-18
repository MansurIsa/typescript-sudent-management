import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLesson } from '../redux/MainReducer';
import { Button, TextField, Typography } from '@mui/material';

const LessonForm: React.FC = () => {
  const [lessonName, setLessonName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherNo, setTeacherNo] = useState<number | ''>('');
  const [lessonClass, setLessonClass] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (lessonName && teacherName && teacherNo && lessonClass) {
      dispatch(addLesson({
        id: Date.now(),
        lessonName,
        teacherName,
        teacherNo: Number(teacherNo),
        class: lessonClass,
      }));
      setLessonName('');
      setTeacherName('');
      setTeacherNo('');
      setLessonClass('');
      setError('');
    } else {
      setError('All fields are required.');
    }
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        label="Lesson Name"
        value={lessonName}
        onChange={(e) => setLessonName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Teacher Name"
        value={teacherName}
        onChange={(e) => setTeacherName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Teacher No"
        type="number"
        value={teacherNo}
        onChange={(e) => setTeacherNo(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Class"
        value={lessonClass}
        onChange={(e) => setLessonClass(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Lesson
      </Button>
    </form>
  );
};

export default LessonForm;
