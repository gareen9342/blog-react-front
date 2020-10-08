import React from 'react'
import wrapper from '../store/configureStore'
const { default: AppLayout } = require('../components/AppLayout')
import axios from 'axios'
import { END } from 'redux-saga'
import { LOAD_MAINPOST_REQUEST } from '../types/post'
import { LOAD_ME_REQUEST } from '../types/user'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import PostCard from '../components/PostCard'
const CenterContainer = styled.div`
    width: 1040px;
    margin: 0 auto;
    padding: 30px 0;
`
const Home = () => {
    // const dispatch = useDispatch()
    const { mainPost } = useSelector((state) => state.post)
    return (
        <>
            <AppLayout>
                <CenterContainer>
                    {/* main post */}
                    {mainPost ? <PostCard postData={mainPost} /> : 'mainPost'}
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
            type: LOAD_MAINPOST_REQUEST,
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Home
