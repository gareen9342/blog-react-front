import React, { useEffect } from 'react'
import Head from 'next/head'
import AppLayout from '../../components/AppLayout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { LOAD_SINGLE_POST_REQUEST } from '../../types/post'
import { LOAD_ME_REQUEST } from '../../types/user'
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
import Link from 'next/link'
import PostCard from '../../components/PostCard'
import { CenterContainer } from '../../styles/common/UI'

function SinglePost() {
    const { singlePost } = useSelector((state) => state.post)
    return (
        <AppLayout>
            <Head>
                <title>{singlePost.subject}</title>
                <meta name="description" content={singlePost.content} />
                {/* 
                    og~ 카카오톡 공유할 때 뜨는 것 
                
                */}
                <meta property="og:title" content={singlePost.subject} />
                {/* <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost/favicon.ico'} /> */}
                <meta
                    property="og:url"
                    content={`${
                        process.env.NODE_ENV === 'production'
                            ? `https://garinsblog.com/post/${singlePost.id}`
                            : 'www.garinslog.com'
                    }`}
                />
            </Head>
            <CenterContainer>
                {singlePost && singlePost.id ? (
                    <PostCard postData={singlePost} />
                ) : (
                    '게시물이 존재하지 않습니다.'
                )}
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
            type: LOAD_SINGLE_POST_REQUEST,
            data: context.params.id,
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)
export default SinglePost
