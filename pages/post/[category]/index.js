import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { END } from 'redux-saga'
import axios from 'axios'
import Link from 'next/link'
import { List, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import AppLayout from '../../../components/AppLayout'
import { LOAD_ME_REQUEST } from '../../../types/user'
import { LOAD_POSTLIST_REQUEST } from '../../../types/post'
import wrapper from '../../../store/configureStore'
import { CenterContainer } from '../../../styles/common/UI'
import PostList from '../../../components/PostList'
moment.locale('ko')
const Posts = () => {
    const router = useRouter()
    const { category } = router.query
    const { categoryPostList } = useSelector((state) => state.post)

    return (
        <AppLayout>
            <CenterContainer>
                <PostList posts={categoryPostList} category={category} />
            </CenterContainer>
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
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Posts
