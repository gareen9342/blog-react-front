import React, { useEffect } from 'react'
import wrapper from '../store/configureStore'
const { default: AppLayout } = require('../components/AppLayout')
import axios from 'axios'
import { END } from 'redux-saga'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Avatar, Row, Col } from 'antd'
import { SubTitle, HeartIcon, CenterContainer } from '../styles/common/UI'
import { LOAD_POSTLIST_REQUEST } from '../types/post'
import { LOAD_ME_REQUEST } from '../types/user'
import { LOAD_MAIN_DIARIES_REQUEST } from '../types/diary'
import PostList from '../components/PostList'
import ImgSlider from '../components/ImgSlider'

const CardListItem = styled.div`
    // width: calc(33.333% - 16px);
    // max-height: 200px;
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
const Home = () => {
    // const dispatch = useDispatch()
    const { categoryPostList, loadPostListError } = useSelector(
        (state) => state.post
    )
    const {
        loadMainDiariesLoading,
        loadMainDiariesError,
        mainDiaryList,
    } = useSelector((state) => state.diary)
    const dispatch = useDispatch()
    //다이어리 데이터
    useEffect(() => {
        dispatch({
            type: LOAD_MAIN_DIARIES_REQUEST,
        })
        return () => {}
    }, [])

    //ㅇㅔ러처리
    useEffect(() => {
        if (loadMainDiariesError) {
            alert(loadMainDiariesError)
        }
        if (loadPostListError) {
            alert(loadPostListError)
        }
        return () => {}
    }, [loadMainDiariesError, loadPostListError])

    console.log(mainDiaryList, categoryPostList)

    return (
        <>
            <AppLayout>
                <CenterContainer>
                    <SubTitle>
                        저의 일상 모음입니다
                        <HeartIcon style={{ color: 'hotpink' }} />
                    </SubTitle>
                    <br />
                    <Row gutter={16}>
                        {loadMainDiariesLoading
                            ? 'diaries loading...'
                            : mainDiaryList.slice(0, 4).map((diary) => (
                                  <Col key={diary.id} span={6}>
                                      <CardListItem>
                                          {diary.Images && (
                                              <ImgSlider
                                                  images={diary.Images}
                                              />
                                          )}
                                          <ParaGraph>{diary.content}</ParaGraph>
                                      </CardListItem>
                                  </Col>
                              ))}
                    </Row>
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Link href="/diary">
                            <a>더 보기</a>
                        </Link>
                    </div>
                    <SubTitle>최신 게시물 입니다.</SubTitle>
                    <PostList posts={categoryPostList} />
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
