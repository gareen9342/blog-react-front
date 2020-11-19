import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { END } from 'redux-saga'
import axios from 'axios'
import styled from 'styled-components'
import AppLayout from '../../components/AppLayout'
import wrapper from '../../store/configureStore'
import { CenterContainer, Title, SubTitle } from '../../styles/common/UI'
import { LOAD_ME_REQUEST } from '../../types/user'
import { SEARCH_POST_REQUEST } from '../../types/search'

const ResultList = styled.ol`
    padding: 50px 0;
`
const ResultListItem = styled.li``
const NoPost = styled.p`
    padding: 50px 0;
`
function Search() {
    const router = useRouter()
    const { word } = router.query
    const { searchResultPosts, searchResultHashtags } = useSelector(
        (state) => state.search
    )
    return (
        <AppLayout>
            <CenterContainer>
                <Title>{word}의 검색결과 입니다.</Title>
                <br />
                <br />
                <br />
                <br />
                <SubTitle>게시물에서 발견된 검색 결과들 입니다. </SubTitle>
                {searchResultPosts.length > 0 ? (
                    <ResultList>
                        {searchResultPosts.map((post) => (
                            <ResultListItem key={post.id}>
                                <Link
                                    href="/post/[category]/[id]"
                                    as={`/post/${post.Category.name_hidden}/${post.id}`}
                                >
                                    <a>{post.subject}</a>
                                </Link>
                            </ResultListItem>
                        ))}
                    </ResultList>
                ) : (
                    <NoPost>게시물이 존재하지 않습니다.</NoPost>
                )}
                <SubTitle>검색어가 포함된 해시태그들 입니다.</SubTitle>
                {searchResultHashtags.length > 0 ? (
                    <ResultList>
                        {searchResultHashtags.map((hashtag) => (
                            <ResultListItem key={hashtag.id}>
                                <Link
                                    href="/hashtag/[tag]"
                                    as={`/hashtag/${hashtag.name}`}
                                >
                                    <a>#{hashtag.name}</a>
                                </Link>
                            </ResultListItem>
                        ))}
                    </ResultList>
                ) : (
                    <NoPost>검색결과가 존재하지 않습니다.</NoPost>
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
            type: SEARCH_POST_REQUEST,
            data: context.params.word,
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)
export default Search
