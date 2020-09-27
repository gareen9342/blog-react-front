import React from 'react'
import PropTypes from 'prop-types'

import 'antd/dist/antd.css'
import Head from 'next/head'
import wrapper from '../store/configureStore'
/**
 * 페이지들의 공통적인 css 처리 등은 여기서 한다.
 */

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>garin's blog</title>
            </Head>
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App)
