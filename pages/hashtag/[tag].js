import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../types/post'
import { LOAD_ME_REQUEST } from '../../types/user'
import { CenterContainer } from '../../styles/common/UI'

const HashTagTitle = styled.h2`
    font-size: 1.5em;
`

function hashtag() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { hashtagPostList, hashtagPostListLoading } = useSelector(
        (state) => state.post
    )
    const { tag } = router.query
    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag,
        })
    }, [])

    return (
        <AppLayout>
            <CenterContainer>
                <HashTagTitle>{tag}</HashTagTitle>
                {hashtagPostListLoading & 'loading...'}
                {hashtagPostList.length > 0 &&
                    hashtagPostList.map((post) => (
                        <Link
                            key={post.id}
                            href="/post/[id]"
                            as={`/post/${post.id}`}
                            prefetch={false}
                        >
                            <a>{post.subject}</a>
                        </Link>
                    ))}
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

        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)
export default hashtag
