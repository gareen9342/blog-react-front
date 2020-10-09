import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Comment, Tooltip, Button, Form, Input } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import Avatar from 'antd/lib/avatar/avatar'
import { CommentArea, CommentCount, DeleteButton } from './styles'
import useInput from '../../hooks/useInput'
import { ADD_COMMENT_REQUEST, DELETE_COMMENT_REQUEST } from '../../types/post'
const Comments = ({ comments, me, postId }) => {
    const { TextArea } = Input
    const dispatch = useDispatch()
    const [commentText, onChangeCommentText] = useInput('')
    const {
        addCommentLoading,
        deleteCommentError,
        deleteCommentLoading,
    } = useSelector((state) => state.post)
    const onSubmitComment = useCallback(() => {
        console.log(postId, commentText)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: postId,
                content: commentText,
            },
        })
    }, [commentText])

    const onDeleteComment = useCallback((commentId) => {
        dispatch({
            type: DELETE_COMMENT_REQUEST,
            data: {
                postId: postId,
                commentId: commentId,
            },
        })
    }, [])
    return (
        <CommentArea>
            {console.log(comments)}
            <CommentCount>{comments.length} 개의 댓글</CommentCount>
            {comments.length > 0 &&
                comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        author={
                            <Link href="/">
                                <a>{comment.User.name}</a>
                            </Link>
                        }
                        avatar={
                            <Avatar
                                src={
                                    comment.User.avatar
                                        ? comment.User.avatar
                                        : '/images/usericon.svg'
                                }
                                alt="author"
                            />
                        }
                        content={<p>{comment.content}</p>}
                        datetime={
                            <Tooltip title={moment().format(comment.createdAt)}>
                                <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    >
                        <DeleteButton
                            danger
                            loading={deleteCommentLoading}
                            onClick={() => onDeleteComment(comment.id)}
                        >
                            delete
                        </DeleteButton>
                    </Comment>
                ))}

            {me && me.id && (
                <Comment
                    avatar={<Avatar src={'/images/usericon.svg'} />}
                    content={
                        <>
                            <Form.Item>
                                <TextArea
                                    rows={4}
                                    // disabled={}
                                    onChange={onChangeCommentText}
                                    value={commentText}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    loading={addCommentLoading}
                                    onClick={onSubmitComment}
                                    type="primary"
                                >
                                    Add Comment
                                </Button>
                            </Form.Item>
                        </>
                    }
                />
            )}
        </CommentArea>
    )
}

Comments.propTypes = {}

export default Comments
