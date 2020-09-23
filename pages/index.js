import React from 'react'
import PropTypes from 'prop-types'
const { default: AppLayout } = require("../components/AppLayout")

const Home = () => {
    return (
       <>
        <div>
            <AppLayout>
                childeren
            </AppLayout>
        </div>
       </>
    )
}

Home.propTypes = {
}

export default Home
