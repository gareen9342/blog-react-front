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
    > .anticon {
        font-size: 30px;
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
