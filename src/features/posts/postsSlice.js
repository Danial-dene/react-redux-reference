import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
import { sub } from 'date-fns'

const initialState = {
   posts: [],
   status: 'idle',
   error: null
 }

 export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
 })

 export const addNewPost = createAsyncThunk(
   'posts/addNewPost',
   // The payload creator receives the partial `{title, content, user}` object
   async initialPost => {
     // We send the initial data to the fake API server
     const response = await client.post('/fakeApi/posts', initialPost)
     // The response includes the complete post object, including unique ID
     return response.data
   }
 )

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
         state.posts.push(action.payload)
         //console.log(state.post.push(action.payload))
      },
      extraReducers(builder) {
         builder
           .addCase(fetchPosts.pending, (state, action) => {
             state.status = 'loading'
           })
           .addCase(fetchPosts.fulfilled, (state, action) => {
             state.status = 'succeeded'
             // Add any fetched posts to the array
             state.posts = state.posts.concat(action.payload)
           })
           .addCase(fetchPosts.rejected, (state, action) => {
             state.status = 'failed'
             state.error = action.error.message
           })
           builder.addCase(addNewPost.fulfilled, (state, action) => {
            // We can directly add the new post object to our posts array
            state.posts.push(action.payload)
          })
       },
      prepare(title, content) {
         return {
         payload: {
         id: nanoid(),//nanoid will generate random things
         title,
         content,
         date: sub(new Date(), { minutes: 10 }).toISOString()
      }
      }
      },
      postUpdated(state, action) {
         const { id, title, content } = action.payload
         const existingPost = state.post.find(post => post.id === id)
         if (existingPost) {
         existingPost.title = title
         existingPost.content = content
      }
      }
      ,
      reactionAdded(state, action) {
         const { postId, reaction } = action.payload
         const existingPost = state.post.find(post => post.id === postId)
         if (existingPost) {
         existingPost.reactions[reaction]++
         }
      }}}})

      
export const { postAdded, postUpdated  } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.post.posts
export const selectPostById = (state, postId) => state.post.find(post => post.id === postId)

