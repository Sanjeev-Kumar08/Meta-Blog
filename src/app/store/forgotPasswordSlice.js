import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    otp: null,
    newPassword: null
}

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {
        setUserEmail : (state, action) => {
            state.email = action.payload
        },
        setUserOTP : (state, action) => {
            state.otp = action.payload
        },
        setUserNewPassword : (state, action) => {
            state.newPassword = action.payload
        }
    }
})

export const {setUserEmail, setUserOTP,setUserNewPassword} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;