import React, { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { Popconfirm, message } from 'antd'
import {
    HeartOutlined,
    HeartFilled,
    QuestionCircleOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import {
    DELETE_POST_REQUEST,
    LIKE_POST_REQUEST,
    UNLIKE_POST_REQUEST,
} from '../../types/post'
import {
    CardWrapper,
    CateName,
    TitleArea,
    Title,
    PostDate,
    BtnCont,
    PostButton,
    Content,
    DeleteButton,
    HashTagItem,
    HashTagArea,
    Likes,
} from './styles'
import Comments from './Comments'
import moment from 'moment'
moment.locale('ko')
const PostCard = ({ postData }) => {
    const dispatch = useDispatch()

    const { me } = useSelector((state) => state.user)
    const { deletePostLoading, deletePostDone } = useSelector(
        (state) => state.post
    )

    const onUnLike = useCallback(() => {
        if (!me?.id) {
            alert('로그인 한 유저만 이용이 가능합니다.')
        }
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: postData.id,
        })
    }, [])

    const onLike = useCallback(() => {
        if (!me?.id) {
            return alert('로그인 한 유저만 이용이 가능합니다.')
        }
        dispatch({
            type: LIKE_POST_REQUEST,
            data: postData.id,
        })
    }, [])
    const onDeletePost = useCallback(() => {
        dispatch({
            type: DELETE_POST_REQUEST,
            data: postData.id,
        })
    }, [])
    useEffect(() => {
        if (deletePostDone) {
            // alert('게시물이 성공적으로 삭제되었습니다.')
            Router.push('/')
        }
        return () => {}
    }, [deletePostDone])
    return (
        <CardWrapper>
            <TitleArea>
                {/* <Link href="/editpost/[id]" as={`/post/${postData.id}`}>
                    <a>testtest</a>
                </Link> */}
                <button
                    onClick={() =>
                        Router.push('/editpost', '/editpost', { shallow: true })
                    }
                >
                    test
                </button>
                <CateName>
                    {postData.Category && postData.Category.name_show}
                </CateName>
                <Title>{postData.subject}</Title>

                <BtnCont>
                    {/* like button */}
                    {me &&
                    me.id &&
                    postData.Likers.find((x) => x.id === me.id) ? (
                        <PostButton ghost htmlType="button" onClick={onUnLike}>
                            <HeartFilled />
                        </PostButton>
                    ) : (
                        <PostButton ghost htmlType="button" onClick={onLike}>
                            <HeartOutlined />
                        </PostButton>
                    )}
                    &nbsp; &nbsp;
                    <Likes>{postData.Likers.length}</Likes> &nbsp; &nbsp;
                    <PostDate>
                        {moment(postData.createdAt).format('YYYY / MM / DD')}
                    </PostDate>
                    &nbsp;&nbsp;
                    {me && me.id && postData.User.id === me.id && (
                        <Popconfirm
                            title="Are you sure？"
                            onConfirm={onDeletePost}
                            icon={
                                <QuestionCircleOutlined
                                    style={{ color: 'red' }}
                                />
                            }
                        >
                            <DeleteButton loading={deletePostLoading}>
                                delete this post
                            </DeleteButton>
                        </Popconfirm>
                    )}
                </BtnCont>
            </TitleArea>
            {/* 내용 영역 */}
            <Content dangerouslySetInnerHTML={{ __html: postData.content }} />
            <HashTagArea>
                {postData.Hashtags &&
                    postData.Hashtags.length > 0 &&
                    postData.Hashtags.map((hashtag) => (
                        <HashTagItem key={hashtag.id}>
                            <Link
                                href="/hashtag/[tag]"
                                as={`/hashtag/${hashtag.name}`}
                            >
                                <a># {hashtag.name}</a>
                            </Link>
                            &nbsp;
                        </HashTagItem>
                    ))}
            </HashTagArea>

            {/* 덧글 영역 */}
            <Comments
                comments={postData.Comments}
                me={me}
                postId={postData.id}
            />
        </CardWrapper>
    )
}

PostCard.propTypes = {}

export default PostCard
