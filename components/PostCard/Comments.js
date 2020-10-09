import React from 'react'
import { CommentArea, CommentCount } from './styles'
import { Comment, Tooltip, Button, Form, Input } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import Avatar from 'antd/lib/avatar/avatar'
const Comments = ({ comments }) => {
    const { TextArea } = Input
    return (
        <CommentArea>
            <CommentCount>{comments.length} 개의 댓글</CommentCount>
            {comments.length > 0 &&
                comments.map((comment) =>
                    comments.length(
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
    )
}

Comments.propTypes = {}

export default Comments
