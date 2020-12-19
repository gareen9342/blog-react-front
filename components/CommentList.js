import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { List } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { LOAD_MAIN_COMMENTS_REQUEST } from '../types/post'
const CommentBox = styled.ul``

function CommentList() {
    const dispatch = useDispatch()
    const {
        loadMainCommentsLoading,
        mainComments,
        loadMainCommentsError,
    } = useSelector((state) => state.post)
    useEffect(() => {
        dispatch({
            type: LOAD_MAIN_COMMENTS_REQUEST,
        })
    }, [])
    return (
        <CommentBox>
            {loadMainCommentsError ? loadMainCommentsError : ''}
            {!!mainComments && mainComments.length > 0 && (
                <List
                    bordered
                    loading={loadMainCommentsLoading}
                    dataSource={mainComments}
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
