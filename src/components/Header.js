import React from 'react'
import Button from './Button'
import {useLocation} from 'react-router-dom'



const Header = ({title , onAdd ,showAdd}) => {
    const location = useLocation()
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname==='/' && <Button color='green' text={showAdd ? 'Close' : 'Add'} onClick={onAdd}></Button>}
            
            
        </header>
    )
}
Header.defaultProps={
    title: 'Task tracker'
}

export default Header
