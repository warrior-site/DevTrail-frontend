import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice';
import journalSlice from "./journalSlice"
import projectSlice from './projectSlice';
import repoSlice from './repoSlice';

export const store = configureStore({
  reducer: {
    user:userSlice,
    journal:journalSlice,
    project:projectSlice,
    repos:repoSlice
  },
})