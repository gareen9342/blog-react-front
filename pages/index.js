import React, { useEffect } from 'react'
import wrapper from '../store/configureStore'
const { default: AppLayout } = require('../components/AppLayout')
import axios from 'axios'
import useSWR from 'swr'
import { backUrl } from '../config/config'
import { END } from 'redux-saga'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import styled from 'styled-components'
import { Divider, Row, Col, Button } from 'antd'
import { HeartIcon, CenterContainer } from '../styles/common/UI'
import { LOAD_POSTLIST_REQUEST } from '../types/post'
import { LOAD_ME_REQUEST } from '../types/user'
import { LOAD_MAIN_DIARIES_REQUEST } from '../types/diary'
import CommentList from '../components/CommentList'
import PostList from '../components/PostList'
import ImgSlider from '../components/ImgSlider'
import {
    RightOutlined,
    NotificationOutlined,
    PushpinOutlined,
} from '@ant-design/icons'

const CardListItem = styled.div`
    // width: calc(33.333% - 16px);
    max-height: 243px;
    overflow: hidden;
    margin-bottom: 30px;
    position: relative;
`
const ParaGraph = styled.h3`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    max-width: 80%;
    word-break: keep-all;
    word-wrap: break-word;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 1.8em;
`

const MainSubTitle = styled.h2`
    font-size: 1em;
    font-weight: 200;
    text-align: left;
`
const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    text-align: right;
    > a {
        font-weight: 200;
        font-size: 1em;
    }
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

const Home = () => {
    // const dispatch = useDispatch()
    const { categoryPostList, loadPostListError } = useSelector(
        (state) => state.post
    )
    const { loadMainDiariesError, mainDiaryList } = useSelector(
        (state) => state.diary
    )

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

                    <Divider orientation="left" plain>
                        <MainSubTitle>최신 게시물</MainSubTitle>
                    </Divider>
                    <PostList posts={categoryPostList} />
                    <br />
                    {/* 
                    
                    최신 댓글
                    */}
                    <Divider orientation="left" plain>
                        <MainSubTitle>최신 댓글</MainSubTitle>
                    </Divider>
                    <CommentList />
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
