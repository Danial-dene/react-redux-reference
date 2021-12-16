import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUser } from './userSlice'

export const UserList = () => {
    const users = useSelector(selectAllUser)

    const renderedUser = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}> {user.name}</Link>
        </li>
    ))

    return(
        <section>
            <h2>Users</h2>
            
            <ul>{renderedUser}</ul>
        </section>
    )
}