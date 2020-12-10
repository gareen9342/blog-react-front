import styled from 'styled-components'
import { Button } from 'antd'
export const CardWrapper = styled.div``
export const CateName = styled.p`
    font-size: 1em;
    padding-bottom: 12px;
`
export const TitleArea = styled.div``
export const Title = styled.h2`
    font-size: 2em;
    padding-bottom: 23px;
    line-height: 1.5;
    max-width: 77%;
    /* overflow: hidden; */
    word-wrap: break-word;
    white-space: pre-wrap;
`
export const PostDate = styled.p`
    color: #9b9b9b;
    font-size: 0.9em;
`
export const BtnCont = styled.div`
    display: flex;
    align-items: center;
`
export const PostButton = styled(Button)`
    padding: 0;
    border: none;
    box-sizing: border-box;
    &.ant-btn-text:active,
    &.ant-btn-text:focus {
        background: none;
    }
    > .anticon {
        vertical-align: middle;
        font-size: 20px;
        color: #d59bf6;
    }
`
export const CommentArea = styled.div``
export const CommentCount = styled.p`
    font-size: 16px;
`
export const Content = styled.div`
    min-height: 500px;
    padding: 20px 30px 50px;
    margin-top: 30px;
    border: 1px solid #e6e6e6;
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    li,
    span {
        line-height: 1.5;
    }

    ul li {
        list-style: disc;
        list-style-position: inside;
    }
    ol li {
        list-style: decimal;
        list-style-position: inside;
    }

    pre {
        color: rgb(191, 199, 213);
        background-color: rgb(41, 45, 62);
        overflow: auto;
        margin: 0;
        padding: 10px;
        line-height: 1.5;
        border-radius: 3px;
        margin-bottom: 23px;
        margin: 20px 0;
    }
`

export const DeleteButton = styled(Button)`
    width: auto;
    height: auto;
    font-size: 0.7em;
    padding: 0 5px;
`

export const Likes = styled.p`
    color: #9b9b9b;
    font-size: 0.9em;
    display: inline-block;
`
export const HashTagArea = styled.div`
    padding-bottom: 50px;
    border-bottom: 1px solid #e6e6e6;
    margin: 50px 0;
`

export const HashTagItem = styled.span`
    > a {
        color: #d59bf6 !important;
        font-weight: 666;
        font-size: 0.9em;
    }
`

export const ViewCount = styled.span`
    color: #9b9b9b;
    font-size: 0.9em;
`
