import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../Pages/config/config";

const initialState = {
        departments: [],
        loading: true,
}

const slice  =createSlice({
    name: "department",
    initialState,
    reducers: {
        departmentUpdate(state, action){
                state.departments =  action.payload.department;
                state.loading= false
        }
    }
})

export default slice.reducer;

export const DepartmentUpdate  = ()=>{
    return async (dispatch, getState)=>{
        await axios.get(`${BASE_URL}/api/department`,{
            headers: {
                authorization: localStorage.getItem("token") || "",
              },    
        }).then((res)=>{
           dispatch(slice.actions.departmentUpdate({
            department: res.data,
           
           }))
        })
    }
}
export const AddDepartment  = ()=>{
    return async (dispatch, getState)=>{
        await axios.get(`${BASE_URL}/api/department`,{
            headers: {
                authorization: localStorage.getItem("token") || "",
              },    
        }).then((res)=>{
           dispatch(slice.actions.departmentUpdate({
            department: res.data,
           
           }))
        })
    }
}