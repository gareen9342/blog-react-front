import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Comment, Tooltip, Button, Form, Input } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import Avatar from 'antd/lib/avatar/avatar'
import { useSelector, useDispatch } from 'react-redux'

import {
    CardWrapper,
    CateName,
    TitleArea,
    Title,
    AuthorName,
    BtnCont,
    PostButton,
    CommentArea,
    CommentCount,
    Content,
} from './styles'
const PostCard = ({ postData }) => {
    const { TextArea } = Input
    const [isLiked, setIsLiked] = useState(false)
    const { me } = useSelector((state) => state.user)
    const onUnLike = useCallback(() => {
        setIsLiked(!isLiked)
    }, [isLiked])

    const onLike = useCallback(() => {
        setIsLiked(!isLiked)
    }, [])
    console.log(postData)
    return (
        <CardWrapper>
            <TitleArea>
                <CateName>{postData.Category.name_show}</CateName>
                <Title>{postData.subject}</Title>
                <AuthorName>author : {postData.User.name}</AuthorName>
                <BtnCont>
                    {/* like button */}
                    {me?.me.id?.postData.Likers.includes(me.id) ? (
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
            <Content dangerouslySetInnerHTML={{ __html: postData.content }} />
            <CommentArea>
                <CommentCount>
                    {postData.Comments.length} 개의 댓글
                </CommentCount>
                {postData.Comments.length > 0 &&
                    postData.Comments.map((comment) =>
                        postData.Comments.length(
                            <Comment
                                author={
                                    <Link href="/">
                                        <a>n</a>
                                    </Link>
                                }
                                avatar={
                                    <Avatar
                                        src={'/images/usericon.svg'}
                                        alt="author"
                                    />
                                }
                                content={<p>코멘트 코멘트</p>}
                                datetime={
                                    <Tooltip
                                        title={moment().format(
                                            'YYYY-MM-DD HH:mm:ss'
                                        )}
                                    >
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                        )
                    )}

                <Comment
                    avatar={<Avatar src={'/images/usericon.svg'} />}
                    content={
                        <>
                            <Form.Item>
                                <TextArea
                                    rows={4}
                                    // disabled={}
                                    // onChange={onChange}
                                    // value={value}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    // loading={submitting}
                                    // onClick={onSubmit}
                                    type="primary"
                                >
                                    Add Comment
                                </Button>
                            </Form.Item>
                        </>
                    }
                />
            </CommentArea>
        </CardWrapper>
    )
}

PostCard.propTypes = {}

export default PostCard
