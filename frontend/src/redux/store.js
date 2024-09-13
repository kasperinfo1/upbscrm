import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./slices/departmentSlice"
import attendanceReducer from './slices/attendanceSlice';
import holidaysReducer from './slices/holidaysSlice';
import employeeReducer from './slices/employeeSlice'; 
import personalInfoReducer from './slices/personalInfoSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
    reducer:{
        department: departmentReducer,
        attendance: attendanceReducer,
        holidays: holidaysReducer,
        employee: employeeReducer,
        personalInfo: personalInfoReducer,
        tasks: tasksReducer
    }
})