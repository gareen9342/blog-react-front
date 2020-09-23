import React from 'react'
import PropTypes from 'prop-types'

const AppLayout = ({children}) => {
    return (
        <div style={{display:"flex"}}>
            <header> menus</header>
            {children}
        </div>
    )
}

AppLayout.propTypes = {

}

export default AppLayout
