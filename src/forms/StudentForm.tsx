import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../redux/MainReducer';
import { Button, TextField } from '@mui/material';

const StudentForm: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [studentNo, setStudentNo] = useState<number | ''>('');
  const [studentClass, setStudentClass] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name && surname && studentNo && studentClass) {
      dispatch(addStudent({
        id: Date.now(),
        name,
        surname,
        studentNo: Number(studentNo),
        class: studentClass,
      }));
      setName('');
      setSurname('');
      setStudentNo('');
      setStudentClass('');
    }
  };

  return (
    <form noValidate autoComplete="off">
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Student No"
        type="number"
        value={studentNo}
        onChange={(e) => setStudentNo(Number(e.target.value))}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Class"
        value={studentClass}
        onChange={(e) => setStudentClass(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Student
      </Button>
    </form>
  );
};

export default StudentForm;
