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
export const AuthorName = styled.p`
    font-size: 1em;
    padding-bottom: 12px;
`
export const BtnCont = styled.div`
    height: 50px;
    display: flex;
`
export const PostButton = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    line-height: 50px;
    border: none;
    box-sizing: border-box;
    &.ant-btn-text:active,
    &.ant-btn-text:focus {
        background: none;
    }
    > .anticon {
        font-size: 30px;
        color: #eb2f96;
    }
`
export const CommentArea = styled.div``
export const CommentCount = styled.p`
    font-size: 16px;
`
export const Content = styled.div`
    min-height: 500px;
    padding-bottom: 50px;
`

export const DeleteButton = styled(Button)`
    width: auto;
    height: auto;
    font-size: 0.7em;
    padding: 0 5px;
`
export const HashTagArea = styled.div`
    padding-bottom: 50px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 50px;
`

export const HashTagItem = styled.span`
    color: #666 !important;
`
