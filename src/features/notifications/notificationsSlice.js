import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { client } from '../../api/client'

export const  fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, {getState}) => {
        const allNotifications = selectAllNotifications(getState)
        const [latestNotifications] = allNotifications
        const latestTimestamp = latestNotifications ? latestNotifications.date : ''
        const response = await client.get(
            `/fakeApi/notifications?since=${latestTimestamp}`
        )
        
        return response.data
    }
)

const initialState ={
    name: 'test'
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {},
    extraReducers: {
        [fetchNotifications.fulfilled] : (state, action) => {
            state.push(...action.payload)

            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    } 
})
export default notificationsSlice.reducer
export const selectAllNotifications = state => state.notification