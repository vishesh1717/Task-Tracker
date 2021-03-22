import React from 'react'

const button = ({color,text,onClick}) => {
    


    return (<button
    onClick={onClick}
    style={{background:color}}
    className="btn" >{text}</button>
    )
}

export default button
