import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:{},
}

const user = createSlice({
    name: "user",
    initialState,
    reducers:{
        getUserInfo: (state, payload)=>{
            state.userData=action.payload;
            
        }
    }
});

export const GetUserInfo =()=>{
    return async(dispatch, g)
}