import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  id: number;
  name: string;
  surname: string;
  studentNo: number; 
  class: string;
}

interface Lesson {
  id: number;
  lessonName: string;
  teacherName: string;
  teacherNo: number;
  class: string;
}

interface Score {
  id: number;
  studentId: number;
  lessonId: number;
  teacherId: number;
  class: string;
  dateTime: string;
  score: number;
}

interface MainState {
  students: Student[];
  lessons: Lesson[];
  scores: Score[];
}

const initialState: MainState = {
  students: [],
  lessons: [],
  scores: [],
};

const mainSlice = createSlice({
  name: 'Main',
  initialState,
  reducers: {
    addStudent(state, action: PayloadAction<Student>) {
      state.students.push(action.payload);
    },
    addLesson(state, action: PayloadAction<Lesson>) {
      state.lessons.push(action.payload);
    },
    addScore(state, action: PayloadAction<Score>) {
      state.scores.push(action.payload);
    },
    updateScore(state, action: PayloadAction<Score>) {
      const index = state.scores.findIndex(score => score.id === action.payload.id);
      if (index !== -1) {
        state.scores[index] = action.payload;
      }
    },
    deleteScore(state, action: PayloadAction<number>) {
      state.scores = state.scores.filter(score => score.id !== action.payload);
    },
  },
});

export const { addStudent, addLesson, addScore, updateScore, deleteScore } = mainSlice.actions;
export default mainSlice.reducer;
