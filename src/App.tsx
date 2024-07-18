import React from 'react';
import { Container, Grid } from '@mui/material';
import StudentsTable from './components/StudentsTable';
import LessonsTable from './components/LessonsTable';
import ScoresTable from './components/ScoresTable';
import StudentForm from './forms/StudentForm';
import LessonForm from './forms/LessonForm';
import ScoreForm from './forms/ScoreForm';


const App: React.FC = () => {
  return (

    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <h2>Students</h2>
          <StudentForm />
          <StudentsTable />
        </Grid>
        <Grid item xs={12} md={6}>
          <h2>Lessons</h2>
          <LessonForm />
          <LessonsTable />
        </Grid>
        <Grid item xs={12}>
          <h2>Scores</h2>
          <ScoreForm />
          <ScoresTable />
        </Grid>
      </Grid>
    </Container>

  );
};

export default App;
