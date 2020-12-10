import React, { useEffect, useState } from 'react'
import { List } from 'antd'
import axios from 'axios'
import useSWR from 'swr'
import styled from 'styled-components'
import Link from 'next/link'

const CommentBox = styled.ul``
const CommentItem = styled.li``

const fetcher = (url) =>
    axios.get(url, { withCredentials: true }).then((result) => result.data)

function CommentList() {
    const [loadCommentsError, setCommentError] = useState('')
    const { data: comments, error: commentsError } = useSWR(
        `${
            process.env.NODE_ENV === 'production'
                ? backUrl
                : 'http://localhost:80'
        }/post/comments`,
        fetcher
    )
    if (commentsError) {
        setCommentError('댓글을 로딩 중에 에러가 발생했습니다.')
    }
    return (
        <CommentBox>
            {!!comments && comments.length > 0 && (
                <List
                    bordered
                    dataSource={comments}
                    renderItem={(item) => (
                        <List.Item>
                            <Link href="/post/[id]" as={`/post/${item.PostId}`}>
                                {item.content}
                            </Link>
                        </List.Item>
                    )}
                />
            )}
        </CommentBox>
    )
}

export default CommentList
