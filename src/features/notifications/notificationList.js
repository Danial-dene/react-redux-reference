import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import classnames from 'classnames'

import {
    selectAllNotifications,
    allNotificationsRead
  } from './notificationsSlice'
import { selectAllUser } from '../posts/users/userSlice'


export const NotificationsList = () => {
    const test  = useSelector(state => state.notification)
    const notifications  = useSelector(selectAllNotifications)
    const users = useSelector(selectAllUser)
    const dispatch = useDispatch()
    
    useLayoutEffect(() => {
        dispatch(allNotificationsRead())
      })

    const renderedNotifications = notifications.map(notification => {
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)
        const user = users.find(user => user.id === notification.user) || {
            name: 'Unknown user'
        }

        const notificationClassname = classnames('notification', {
            new: notification.isNew
          })
          
    return(
        <div key={notification.id} className={notificationClassname}>
            <div>
                <b>{user.name}</b> {notifications.message}
            </div>
            <div title={notifications.date}>
                <i>{timeAgo} ago</i>
            </div>
        </div>
    )
    
    
    })
    console.log(test)  
    return (
        <section className="notificationsList">
          <h2>Notifications</h2>
          {renderedNotifications}
        </section>
      )

}