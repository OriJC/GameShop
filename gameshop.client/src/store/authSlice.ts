import { Token } from '@mui/icons-material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState
{
    token: string | null
    username: string | null
}

const initialState: AuthState =
{   
    token: null,
    username: null
}

const authSlice = createSlice({
    name = 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; username: string }>) => {
            state.token = action.payload.token
            state.username = action.payload.username
        },
        clearAuth: (state) =>
        {
            state.token = null
            state.username = null
        }
    }
})

export const { setAuth, clearAuth } = authSlice.actions }
export default authSlice.reducer
