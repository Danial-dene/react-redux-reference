import React from 'react'
import { useSelector } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'

import { selectAllNotifications } from './notificationsSlice'
import { selectAllUser } from '../posts/users/userSlice'

export const NotificationsList = () => {
    const notifications  = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUser)
    
    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user.id === notification.user) || {
            name: 'Unknown user'
        }
    
    return(
        <div key={notifications.id}  className="notification">
            <div>
                <b>{user.name}</b> {notifications.message}
            </div>
            <div title={notifications.date}>
                <i>{timeAgo} ago</i>
            </div>
        </div>
    )
    
    
    })
    console.log(notifications)  
    return (
        <section className="notificationsList">
          <h2>Notifications</h2>
          {renderedNotifications}
        </section>
      )

}