import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const StudentsTable: React.FC = () => {
  const students = useSelector((state: RootState) => state.Data.students);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Surname</TableCell>
          <TableCell>Student No</TableCell>
          <TableCell>Class</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.surname}</TableCell>
            <TableCell>{student.studentNo}</TableCell>
            <TableCell>{student.class}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StudentsTable;
