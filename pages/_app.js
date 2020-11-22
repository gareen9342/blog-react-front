import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import 'draft-js/dist/Draft.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import styled, { createGlobalStyle } from 'styled-components'
import wrapper from '../store/configureStore'
import '../styles/common/font.scss'
// import '../styles/common/globalStyles.scss'
/**
 * 페이지들의 공통적인 css 처리 등은 여기서 한다.
 */
const GlobalStyle = createGlobalStyle`
    ol,ul,dl,li{list-style:none;}
    body{
        min-height:100vh;
        position:relative;
        font-size:16px;
        // .ant-dropdown-menu{}
        // 헤더를 위한 스타일링
        .ant-dropdown-menu-item svg path,
        .ant-dropdown-menu-item span{color:#000}
        // &.light-mode {
        //     background-color: #fff;
            
        //     *{
        //         color: #000; 
        //     }
        // }
        // &.dark-mode {
           
        //     background: #001529;
        //     *{
        //         color: hsla(0, 0%, 100%, 0.65) 
        //     }
        // }
    }
    h1,h2,h3,h4,h5,h6,p,ol,ul,dl,li{
        line-height:1;margin:0;padding:0;
    }
    .ant-input,
   .ant-input:focus, 
   .ant-input-focused {
        border-color:transparent;
        box-shadow:0 0 0 transparent;
        border: 1px solid #eee;

       }
    //    .rdw-editor-main pre {
    //     color: rgb(191, 199, 213);
    //     background-color: rgb(41, 45, 62);
    //     overflow: auto;
    //     margin: 0;
    //     padding: 10px;
    //     line-height: 1.5;
    //     border-radius: 3px;
    //     margin-bottom: 23px;
    //     margin: 20px 0;
    //     span{
    //         color: rgb(191, 199, 213) ;
    //     }
    //    }
  
`

const App = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>꿈많은 개발자 누피씨의 개발블로그</title>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/images/favicon-16x16.png"
                ></link>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/images/favicon-32x32.png"
                ></link>
                <meta
                    name="description"
                    content="안녕하세요, 누피씨의 개발로그 입니다."
                />
                {/* <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost/favicon.ico'} /> */}
                <meta property="og:title" content="누피씨 개발로그" />
                <meta
                    property="og:description"
                    content="안녕하세요, 누피씨 개발 블로그 입니다."
                />
                <meta
                    property="og:url"
                    content={`${
                        process.env.NODE_ENV === 'production' &&
                        `https://garinsblog.com`
                    }`}
                />
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
