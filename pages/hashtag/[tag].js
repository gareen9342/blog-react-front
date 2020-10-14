import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../types/post'
import { LOAD_ME_REQUEST } from '../../types/user'
const HashTagTitle = styled.h2`
    font-size: 1.5em;
`
const CenterContainer = styled.div`
    width: 1040px;
    margin: 0 auto;
    padding: 30px 0;
`
function tag() {
    const router = useRouter()
    const { hashtagPostList } = useSelector((state) => state.post)
    const { tag } = router.query
    console.log(hashtagPostList)
    return (
        <AppLayout>
            <CenterContainer>
                <HashTagTitle>{tag}</HashTagTitle>
                {hashtagPostList &&
                    hashtagPostList.map((post) => (
                        <Link
                            key={post.id}
                            href="/post/[category]/[id]"
                            as={`/post/${post.Category.name_hidden}/${post.id}`}
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
        // console.log('context=', context)
        context.store.dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: context.params.tag,
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)
export default tag
