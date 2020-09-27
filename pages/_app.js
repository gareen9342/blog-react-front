import React from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import Head from 'next/head'
import wrapper from '../store/configureStore'
import styled, { createGlobalStyle } from 'styled-components'
// import '../styles/common/globalStyles.scss'
/**
 * 페이지들의 공통적인 css 처리 등은 여기서 한다.
 */
const GlobalStyle = createGlobalStyle`
    ol,ul,dl{list-style:none;}
    body{
        min-height:100vh;
        position:relative;
        &.light-mode {
            background-color: #fff;
            color: #000;
        }
        &.dark-mode {
            color: hsla(0, 0%, 100%, 0.65);
            background: #001529;
        }
    }
`

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>garin's blog</title>
            </Head>

            <GlobalStyle />
            <Component />
        </>
    )
}

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App)
