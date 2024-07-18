import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { deleteScore } from '../redux/MainReducer';
import ScoreForm from '../forms/ScoreForm';

const ScoresTable: React.FC = () => {
  const scores = useSelector((state: RootState) => state.Data.scores);
  const students = useSelector((state: RootState) => state.Data.students);
  const lessons = useSelector((state: RootState) => state.Data.lessons);
  const [editScoreId, setEditScoreId] = useState<number | null>(null);

  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    dispatch(deleteScore(id));
  };

  const handleEdit = (id: number) => {
    setEditScoreId(id);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Lesson</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Date-Time</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score: any) => (
            <TableRow key={score.id}>
              <TableCell>
                {students.find(student => student.id === score.studentId)?.name}{' '}
                {students.find(student => student.id === score.studentId)?.surname}
              </TableCell>
              <TableCell>
                {lessons.find(lesson => lesson.id === score.lessonId)?.teacherName}
              </TableCell>
              <TableCell>
                {lessons.find(lesson => lesson.id === score.lessonId)?.lessonName}
              </TableCell>
              <TableCell>{score.class}</TableCell>
              <TableCell>{score.dateTime}</TableCell>
              <TableCell>{score.score}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(score.id)}>Edit</Button>
                <Button onClick={() => handleDelete(score.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editScoreId !== null && <ScoreForm editScoreId={editScoreId} setEditScoreId={setEditScoreId} />}
    </div>
  );
};

export default ScoresTable;
