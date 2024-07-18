import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addScore, updateScore } from '../redux/MainReducer';
import { Button, MenuItem, Select, TextField, InputAdornment, IconButton, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface ScoreFormProps {
  editScoreId?: number | null;
  setEditScoreId?: (id: number | null) => void;
}

const ScoreForm: React.FC<ScoreFormProps> = ({ editScoreId = null, setEditScoreId }) => {
  const students = useSelector((state: RootState) => state.Data.students);
  const lessons = useSelector((state: RootState) => state.Data.lessons);
  const scores = useSelector((state: RootState) => state.Data.scores);

  const [studentId, setStudentId] = useState<number | ''>('');
  const [lessonId, setLessonId] = useState<number | ''>('');
  const [teacherId, setTeacherId] = useState<number | ''>('');
  const [classValue, setClassValue] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [score, setScore] = useState<number | ''>('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (editScoreId !== null) {
      const scoreToEdit = scores.find(score => score.id === editScoreId);
      if (scoreToEdit) {
        setStudentId(scoreToEdit.studentId);
        setLessonId(scoreToEdit.lessonId);
        setTeacherId(scoreToEdit.teacherId);
        setClassValue(scoreToEdit.class);
        setDateTime(scoreToEdit.dateTime);
        setScore(scoreToEdit.score);
      }
    }
  }, [editScoreId, scores]);

  const handleStudentChange = (e: SelectChangeEvent<number>) => {
    const selectedStudentId = e.target.value as number;
    setStudentId(selectedStudentId);
    const selectedStudent = students.find(student => student.id === selectedStudentId);
    if (selectedStudent) {
      setClassValue(selectedStudent.class);
    }
  };

  const handleLessonChange = (e: SelectChangeEvent<number>) => {
    const selectedLessonId = e.target.value as number;
    setLessonId(selectedLessonId);
    const selectedLesson = lessons.find(lesson => lesson.id === selectedLessonId);
    if (selectedLesson) {
      setClassValue(selectedLesson.class);
      setTeacherId(selectedLesson.teacherNo);
    }
  };

  const handleSubmit = () => {
    if (studentId && lessonId && teacherId && classValue && dateTime && score) {
      if (editScoreId !== null) {
        dispatch(updateScore({
          id: editScoreId,
          studentId: Number(studentId),
          lessonId: Number(lessonId),
          teacherId: Number(teacherId),
          class: classValue,
          dateTime,
          score: Number(score),
        }));
        setEditScoreId && setEditScoreId(null);
      } else {
        dispatch(addScore({
          id: Date.now(),
          studentId: Number(studentId),
          lessonId: Number(lessonId),
          teacherId: Number(teacherId),
          class: classValue,
          dateTime,
          score: Number(score),
        }));
      }
      setStudentId('');
      setLessonId('');
      setTeacherId('');
      setClassValue('');
      setDateTime('');
      setScore('');
      setError('');
    } else {
      setError('All fields are required.');
    }
  };

  return (
    <form noValidate autoComplete="off">
      <Select
        value={studentId}
        onChange={handleStudentChange}
        displayEmpty
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="" disabled>
          Select Student
        </MenuItem>
        {students.map(student => (
          <MenuItem key={student.id} value={student.id}>
            {student.name} {student.surname}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={lessonId}
        onChange={handleLessonChange}
        displayEmpty
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="" disabled>
          Select Lesson
        </MenuItem>
        {lessons.map(lesson => (
          <MenuItem key={lesson.id} value={lesson.id}>
            {lesson.lessonName}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Teacher No"
        type="number"
        value={teacherId}
        onChange={(e) => setTeacherId(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: 2 }}
        disabled
      />
      <TextField
        label="Class"
        value={classValue}
        onChange={(e) => setClassValue(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Date-Time"
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Score"
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {editScoreId !== null ? 'Update Score' : 'Add Score'}
      </Button>
    </form>
  );
};

export default ScoreForm;
