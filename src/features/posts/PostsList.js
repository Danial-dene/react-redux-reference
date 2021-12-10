    import React, {useState} from 'react'
    import { useSelector } from 'react-redux'
    import { Link } from 'react-router-dom'
    
    
    export const PostsList = () => {
    const posts = useSelector(state => state.posts)
    

    const renderedPosts = posts.map(posts => (
        <article className="post-excerpt" key={posts.id}>
        <h3>{posts.title}</h3>
        <p className="post-content">{posts.content.substring(0, 100)}</p>
        <Link to={`/posts/${posts.id}`} className="button muted-button">
        View Post
        </Link>
        </article>
    ))

    return (
        <section className="posts-list">
        <h2>Posts</h2>
        {renderedPosts}
        </section>
    )
    }