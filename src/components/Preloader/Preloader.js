import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    if (props.preloader) {
        return (
            <div className="preloader">
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }

};

export default Preloader
