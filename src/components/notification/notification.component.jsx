import React from 'react'
import './notification.style.scss'
import Button from '../button/button.component';

const Notification = ({ hideNotify }) => {
    return (
        <div className="notification"><p>You need to verify your email</p> <Button additionalClasses="notify" onClick={hideNotify}>Close</Button> </div>
    )
}

export default Notification
