import React from 'react'
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
