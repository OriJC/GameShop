import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface AuthState
{
    userId: string | null
    token: string | null
    userName: string | null
    isLogin: boolean
}

const initialState: AuthState =
{   
    userId: null,
    token: null,
    userName: null,
    isLogin: false

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; userName: string, isLogin: boolean }>) => {
            state.userId = action.payload.token
            state.token = action.payload.token
            state.userName = action.payload.userName
            state.isLogin = action.payload.isLogin
        },
        clearAuth: (state) =>
        {
            state.userId = null
            state.token = null
            state.userName = null
            state.isLogin = false
        }
    }
})

export const { setAuth, clearAuth } = authSlice.actions 
export default authSlice.reducer
