import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { END } from 'redux-saga'
import axios from 'axios'
import Link from 'next/link'
import { Card, Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import AppLayout from '../../../components/AppLayout'
import { LOAD_ME_REQUEST } from '../../../types/user'
import { LOAD_POSTLIST_REQUEST } from '../../../types/post'
import wrapper from '../../../store/configureStore'
moment.locale('ko')
const { Meta } = Card
const PreviewCard = styled(Card)`
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
    .ant-card-meta-description {
        color: gray !important;
    }
`
const backgroundList = [
    '#ff9de2',
    '#fd9fe1',
    '#faa2e0',
    '#f8a4df',
    '#f5a7de',
    '#f3a9dd',
    '#f0acdc',
    '#eeaedb',
    '#ebb1da',
    '#e9b3d9',
    '#e6b5d8',
    '#e4b8d7',
    '#e2bad6',
]
const TextBox = styled.div`
    background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : '#f2f2f2'};
    padding: 20px 30px;
    height: 130px;
    display: flex;
    overflow: hidden;
    align-items: center;
`
const Subject = styled.p`
    color: #fff !important;
    font-size: 2.6em;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
`
const Posts = () => {
    const router = useRouter()
    const { category } = router.query
    const { categoryPostList } = useSelector((state) => state.post)

    const handleClick = useCallback(
        (id) => () => {
            router.push(`/post/${category}/${id}`)
        },
        []
    )
    return (
        <AppLayout>
            <Row gutter={16} style={{ padding: '30px 0' }}>
                {categoryPostList.length > 0 &&
                    categoryPostList.map((item) => (
                        <Col key={item.id} xs={24} md={6}>
                            <PreviewCard
                                hoverable
                                onClick={handleClick(item.id)}
                                cover={
                                    <TextBox
                                        backgroundColor={
                                            backgroundList[
                                                Math.floor(
                                                    Math.random() *
                                                        backgroundList.length
                                                )
                                            ]
                                        }
                                    >
                                        <Subject>{item.subject}</Subject>
                                    </TextBox>
                                }
                            >
                                <Meta
                                    avatar={
                                        item.User.avatar ? (
                                            <Avatar src={item.User.avatar} />
                                        ) : (
                                            <UserOutlined />
                                        )
                                    }
                                    title={item.subject}
                                    description={moment(item.createdAt).format(
                                        'YYYY.MM.DD'
                                    )}
                                />
                            </PreviewCard>
                        </Col>
                    ))}
            </Row>
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        const cookie = context.req ? context.req.headers.cookie : ''

        axios.defaults.headers.Cookie = ''

        if (context.req && cookie) {
            axios.defaults.headers.Cookie = cookie
        }
        // console.log('context=', context)
        context.store.dispatch({
            type: LOAD_POSTLIST_REQUEST,
            data: context.params.category[0],
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        /*
        
         여기다 데이터 페칭
        
        */
        // if (context.params.category.length > 1) {
        //     context.store.dispatch({
        //         type: LOAD_POSTLIST_REQUEST,
        //         data: context.params.category[0],
        //     })
        // }
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Posts
