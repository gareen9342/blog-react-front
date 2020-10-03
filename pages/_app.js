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
        .ant-btn{background-color:transparent !important;}
        // .ant-dropdown-menu{}
        // 헤더를 위한 스타일링
        .ant-dropdown-menu-item svg path,
        .ant-dropdown-menu-item span{color:#000}
        &.light-mode {
            background-color: #fff;
            
            *{
                color: #000; 
            }
        }
        &.dark-mode {
           
            background: #001529;
            *{
                color: hsla(0, 0%, 100%, 0.65) 
            }
        }
    }
`

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="//cdn.quilljs.com/1.2.6/quill.snow.css"
                />
                <link
                    rel="stylesheet"
                    href="node_modules/react-quill/dist/quill.snow.css"
                ></link>

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
