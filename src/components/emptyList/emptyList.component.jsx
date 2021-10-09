import React from 'react'
import './emptyList.style.scss'

const EmptyList = ({ message }) => {
    return (
        <div className="emptyicon-holder">
            <div className="icon-post-page first">
                <div className="icon-post-page-title"></div>
                <div className="icon-post-page-text short-line"></div>
                <div className="icon-post-page-text long-line"></div>
                <div className="icon-post-page-text long-line"></div>
                <div className="icon-post-page-text short-line"></div>
                <div className="icon-post-page-text long-line"></div>
                <div className="icon-post-page-text short-line"></div>
            </div>
            <div className="icon-post-page second">
                <div className="icon-post-page-title"></div>
                <div className="icon-post-page-text short-line"></div>
                <div className="icon-post-page-text long-line"></div>
                <div className="icon-post-page-text long-line"></div>
                <div className="icon-post-page-text short-line"></div>
                <div className="icon-post-page-text long-line"></div>
                <div className="icon-post-page-text short-line"></div>
            </div>
            <div className="error-sign">
                <div className="circle"></div>
            </div>
            <p className="icon-message">{message}</p>
        </div>
    )
}

export default EmptyList
