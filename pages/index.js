import React, { useEffect } from 'react'
import wrapper from '../store/configureStore'
const { default: AppLayout } = require('../components/AppLayout')
import axios from 'axios'
import { END } from 'redux-saga'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import styled from 'styled-components'
import { Divider, Row, Col, Button } from 'antd'
import { HeartIcon, CenterContainer } from '../styles/common/UI'
import { LOAD_POSTLIST_REQUEST } from '../types/post'
import { LOAD_ME_REQUEST } from '../types/user'
import { LOAD_MAIN_DIARIES_REQUEST } from '../types/diary'
import PostList from '../components/PostList'
import ImgSlider from '../components/ImgSlider'
import { RightOutlined } from '@ant-design/icons'
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

    return (
        <>
            <AppLayout>
                <CenterContainer>
                    <Divider orientation="left" plain>
                        <MainSubTitle>
                            일상 모음 &nbsp;
                            <HeartIcon style={{ color: 'hotpink' }} />
                        </MainSubTitle>
                    </Divider>
                    <br />
                    <Row gutter={16}>
                        {mainDiaryList.length > 0 &&
                            mainDiaryList.map((diary) => (
                                <Col key={diary.id} xs={24} md={12} lg={6}>
                                    <CardListItem>
                                        <Link
                                            href="/diary/[id]"
                                            as={`/diary/${diary.id}`}
                                            prefetch={false}
                                        >
                                            <a>
                                                {diary.Images && (
                                                    <ImgSlider
                                                        images={diary.Images}
                                                    />
                                                )}
                                                <ParaGraph>
                                                    {diary.content}
                                                </ParaGraph>
                                            </a>
                                        </Link>
                                    </CardListItem>
                                </Col>
                            ))}
                    </Row>
                    <BtnWrap>
                        <Link href="/diary" prefetch={false}>
                            <a>
                                일상 카테고리 더 보기
                                <RightOutlined />
                            </a>
                        </Link>
                    </BtnWrap>
                    <Divider orientation="left" plain>
                        <MainSubTitle>최신 게시물</MainSubTitle>
                    </Divider>
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
            type: LOAD_MAIN_DIARIES_REQUEST,
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Home
