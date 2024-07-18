import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const LessonsTable: React.FC = () => {
  const lessons = useSelector((state: RootState) => state.Data.lessons);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Lesson Name</TableCell>
          <TableCell>Teacher Name</TableCell>
          <TableCell>Teacher No</TableCell>
          <TableCell>Class</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {lessons.map((lesson: any) => (
          <TableRow key={lesson.id}>
            <TableCell>{lesson.lessonName}</TableCell>
            <TableCell>{lesson.teacherName}</TableCell>
            <TableCell>{lesson.teacherNo}</TableCell>
            <TableCell>{lesson.class}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LessonsTable;
