import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
   { id: '1', name: 'First Post!', content: 'Hello!' },
   { id: '2', name: 'Second Post', content: 'More text' }
   ]

const postsSlice = createSlice({
name: 'posts',
initialState,
reducers: {
   /*reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.find(post => post.id === postId)
      if (existingPost) {
      existingPost.reactions[reaction]++
      }
 },*/
   postAdded: {
      reducer(state, action) {
         state.push(action.payload)
      },
      prepare(title, content) {
         return {
         payload: {
         id: nanoid(),
         title,
         content: 'Hello!',
         date: sub(new Date(), { minutes: 10 }).toISOString()
      }
      }
      },
      postUpdated(state, action) {
         const { id, title, content } = action.payload
         const existingPost = state.find(post => post.id === id)
         if (existingPost) {
         existingPost.title = title
         existingPost.content = content
      }
      }
      ,
      reactionAdded(state, action) {
         const { postId, reaction } = action.payload
         const existingPost = state.find(post => post.id === postId)
         if (existingPost) {
         existingPost.reactions[reaction]++
         }
      }}}})

export const { postAdded, postUpdated  } = postsSlice.actions
export default postsSlice.reducer