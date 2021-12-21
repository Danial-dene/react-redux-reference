import React, {useEffect, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { useGetPostsQuery } from '../api/apiSlice'
import classnames from 'classnames'

let PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

/*export const PostsList = () => {
  //const posts1 = useSelector(state => state.post)
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.post.status)
  const error = useSelector(state => state.post.status)
  const dispatch = useDispatch()
  
  console.log()
  useEffect(() => {
    if(postStatus === 'idle'){
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  
  const orderedPosts = posts
    //.slice()
    //.sort((a, b) => b.date.localeCompare(a.date))
    //console.log(posts1)
  
  const renderedPosts = orderedPosts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content.substring(0, 100)}</p>
        {/*<ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
    )
  })*/
  
  export const PostsList = () => {  
    const {
      data: posts = [],
      isLoading,
      isSuccess,
      isFetching,
      isError,
      error,
      refetch
    } = useGetPostsQuery()
    
    const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice()
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
    return sortedPosts
    
  }, [posts])
  
  let content

  /*if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }
  //console.log(content)*/

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
        {/*renderedPosts*/}
        {/*orderedPosts*/}
        {content}
    </section>
  )
}