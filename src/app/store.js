import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import userReducer from '../features/posts/users/userSlice'
import notificationReducer from '../features/notifications/notificationsSlice'

export default configureStore({
  reducer:{
    post: postsReducer,
    user: userReducer,
    notification : notificationReducer
  },
})
