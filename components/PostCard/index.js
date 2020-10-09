import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { HeartOutlined, HeartFilled } from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux'
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../types/post'
import {
    CardWrapper,
    CateName,
    TitleArea,
    Title,
    AuthorName,
    BtnCont,
    PostButton,
    Content,
} from './styles'
import Comments from './Comments'

const PostCard = ({ postData }) => {
    const dispatch = useDispatch()

    const { me } = useSelector((state) => state.user)
    const onUnLike = useCallback(() => {
        if (!me) {
            alert('로그인 한 유저만 이용이 가능합니다.')
        }
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: postData.id,
        })
    }, [])

    const onLike = useCallback(() => {
        if (!me) {
            alert('로그인 한 유저만 이용이 가능합니다.')
        }
        dispatch({
            type: LIKE_POST_REQUEST,
            data: postData.id,
        })
    }, [])

    return (
        <CardWrapper>
            <TitleArea>
                <CateName>{postData.Category.name_show}</CateName>
                <Title>{postData.subject}</Title>
                <AuthorName>author : {postData.User.name}</AuthorName>
                <BtnCont>
                    {/* like button */}
                    {me &&
                    me.id &&
                    postData.Likers.find((x) => x.id === me.id) ? (
                        <PostButton onClick={onUnLike}>
                            <HeartFilled />
                        </PostButton>
                    ) : (
                        <PostButton onClick={onLike}>
                            <HeartOutlined />
                        </PostButton>
                    )}
                </BtnCont>
            </TitleArea>
            {/* 내용 영역 */}
            <Content dangerouslySetInnerHTML={{ __html: postData.content }} />
            {/* 덧글 영역 */}
            <Comments comments={postData.Comments} />
        </CardWrapper>
    )
}

PostCard.propTypes = {}

export default PostCard
