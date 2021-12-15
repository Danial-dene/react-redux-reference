import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import userReducer from '../features/posts/users/userSlice'

export default configureStore({
  reducer:{
    post: postsReducer,
    user: userReducer
  },
})
