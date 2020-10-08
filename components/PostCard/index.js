import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Comment, Tooltip, Button, Form, Input } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import Avatar from 'antd/lib/avatar/avatar'

const CardWrapper = styled.div``
const CateName = styled.p`
    font-size: 15px;
`
const Title = styled.h2`
    line-height: 50px;
    height: 50px;
`
const BtnCont = styled.div`
    height: 50px;
    display: flex;
`
const PostButton = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    line-height: 50px;
    border: none;
    box-sizing: border-box;
    > .anticon {
        font-size: 30px;
    }
`
const Content = styled.div`
    min-height: 500px;
`
const TitleArea = styled.div``

const CommentArea = styled.div``
const PostCard = () => {
    const { TextArea } = Input
    const [isLiked, setIsLiked] = useState(false)
    const onUnLike = useCallback(() => {
        setIsLiked(!isLiked)
    }, [isLiked])

    const onLike = useCallback(() => {
        setIsLiked(!isLiked)
    }, [])
    return (
        <CardWrapper>
            <TitleArea>
                <CateName>css</CateName>
                <Title>이것은 아주 좋은 제목이다 와아아아아아ㅏ아아아</Title>
                <BtnCont>
                    {/* like button */}
                    {isLiked ? (
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
            <Content>contentskjdhflkjhlfkjaksjldhaska</Content>
            <CommentArea>
                <Comment
                    author={
                        <Link href="/">
                            <a>author</a>
                        </Link>
                    }
                    avatar={
                        <Avatar src={'/images/usericon.svg'} alt="author" />
                    }
                    content={<p>코멘트 코멘트</p>}
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                />

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
