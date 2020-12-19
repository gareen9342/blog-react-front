import React, { useEffect, useState } from 'react'
import wrapper from '../store/configureStore'
const { default: AppLayout } = require('../components/AppLayout')
import axios from 'axios'
import { END } from 'redux-saga'
import { useSelector } from 'react-redux'
// import Link from 'next/link'
import styled from 'styled-components'
import { NotificationOutlined, PushpinOutlined } from '@ant-design/icons'
import { Row, Col } from 'antd'
import { CenterContainer } from '../styles/common/UI'
import { LOAD_POSTLIST_REQUEST } from '../types/post'
import { LOAD_ME_REQUEST } from '../types/user'
import CommentList from '../components/CommentList'
import PostList from '../components/PostList'
import GuestBookForm from '../components/GuestBookForm'
import GuestBookList from '../components/GuestBookList'

const MainSubTitle = styled.h2`
    padding: 20px 0;
    font-size: 1.3em;
    font-weight: 200;
    text-align: left;
`

const MainNoticeWrap = styled.div`
    padding-bottom: 50px;
`
const MainNotice = styled.h2`
    font-size: 0.9em;
    font-weight: 200;
    text-align: left;
    margin-bottom: 15px;
`
const MainNoticeSub = styled.h3`
    font-size: 0.9em;
    font-weight: 200;
    text-align: left;
    line-height: 1.4;
`
const GuestBookWrap = styled.div`
    position: relative;
    height: 500px;
`
const Home = () => {
    // const dispatch = useDispatch()
    const { categoryPostList, loadPostListError } = useSelector(
        (state) => state.post
    )
    const { loadMainDiariesError } = useSelector((state) => state.diary)
    //ㅇㅔ러처리
    useEffect(() => {
        if (loadMainDiariesError) {
            alert(loadMainDiariesError)
        }
        if (loadPostListError) {
            alert(loadPostListError)
        }
    }, [loadMainDiariesError, loadPostListError])

    // console.log
    return (
        <>
            <AppLayout>
                <CenterContainer>
                    <MainNoticeWrap>
                        <MainNotice>
                            <NotificationOutlined />
                            &nbsp; &nbsp; 안녕하세요, 키작고 꿈 많은 개발자
                            스누피의 블로그 입니다. 반갑습니다^^
                        </MainNotice>
                        <MainNoticeSub>
                            <PushpinOutlined /> &nbsp; 건의 및 신고기능은 차차
                            추가될 예정입니다. 아쉬운 부분, 버그, 추가됐으면
                            좋겠는 기능 등... &nbsp;
                            <a href="mailto:chogr9342@gmail.com">
                                chogr9342@gmail.com
                            </a>
                            으로 문의 및 건의 받고 있습니다.
                        </MainNoticeSub>
                        <MainNoticeSub>
                            <PushpinOutlined /> &nbsp; 제가 공부하며 정리하기
                            위해 만든 목적이 큰 블로그 입니다. 아직 많이
                            부족하니 틀린 점이나 아쉬운 점이 있다면 댓글로 제보
                            부탁드립니다 🙏
                        </MainNoticeSub>
                    </MainNoticeWrap>

                    {/* <Divider orientation="left" plain /> */}
                    <MainSubTitle>최신 게시물</MainSubTitle>
                    <PostList posts={categoryPostList} />
                    <br />
                    {/* 
                    
                    최신 댓글
                    */}
                    {/* <Divider orientation="left" plain /> */}
                    <Row gutter={16}>
                        <Col xs={24} md={12} lg={12}>
                            <MainSubTitle>최신 댓글</MainSubTitle>
                            <CommentList />
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <MainSubTitle>방명록</MainSubTitle>
                            <GuestBookWrap>
                                <GuestBookList />
                                <GuestBookForm />
                            </GuestBookWrap>
                        </Col>
                    </Row>
                </CenterContainer>
            </AppLayout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        //서버쪽에서 실행시에는 context.req 존재

        const cookie = context.req ? context.req.headers.cookie : ''

        axios.defaults.headers.Cookie = ''

        if (context.req && cookie) {
            axios.defaults.headers.Cookie = cookie
        }
        context.store.dispatch({
            type: LOAD_POSTLIST_REQUEST,
            data: 'main',
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Home
