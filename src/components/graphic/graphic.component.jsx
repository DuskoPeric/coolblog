import React from 'react'
import './graphic.style.scss'

const Graphic = ({additionalClasses}) => {
    return (
        <div className={`graphic ${additionalClasses}`}>
          <div className="sq sq-7"></div>
          <div className="sq sq-6"></div>
          <div className="sq sq-5"></div>
          <div className="sq sq-4"></div>
          <div className="sq sq-3"></div>
          <div className="sq sq-2"></div>
          <div className="sq sq-1"></div>
        </div>
    )
}

export default Graphic
