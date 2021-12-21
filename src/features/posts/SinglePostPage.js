import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { selectPostById } from './postsSlice'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

export const SinglePostPage = ({ match }) => {
const { postId } = match.params
//access redux store using Hook 'useSelector'
//const post = useSelector(state => selectPostById(state, postId))
    
//access redux store using function
const {
    data: post, 
    isFetching, 
    isSuccess

} = useGetPostQuery(postId)

console.log(postId)

let content
  if (isFetching) {
    content = <Spinner text="Loading..."/>
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
           {/*<TimeAgo timestamp={post.date} />*/}
        </div>
        <p className="post-content">{post.content}</p>
       {/*<ReactionButtons post={post} />*/}
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  }

  return <section>{content}</section>
}