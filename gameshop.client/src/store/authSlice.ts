import { Token } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

interface AuthState
{
    token: string | null
    username: string | null
    isLogin: boolean
}

const initialState: AuthState =
{   
    token: null,
    username: null,
    isLogin: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; username: string, isLogin: boolean }>) => {
            state.token = action.payload.token
            state.username = action.payload.username
            state.isLogin = action.payload.isLogin
        },
        clearAuth: (state) =>
        {
            state.token = null
            state.username = null
            state.isLogin = false
        }
    }
})

export const { setAuth, clearAuth } = authSlice.actions 
export default authSlice.reducer
