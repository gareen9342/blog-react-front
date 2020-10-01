import React from 'react'
const { default: AppLayout } = require('../components/AppLayout')
// import { useDispatch } from 'react-redux'
//ssr
import wrapper from '../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
import { LOAD_ME_REQUEST } from '../types/user'
const Home = () => {
    // const dispatch = useDispatch()
    return (
        <>
            <AppLayout>childeren</AppLayout>
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
            type: LOAD_ME_REQUEST,
        })

        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Home
