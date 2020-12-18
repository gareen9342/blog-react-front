import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import Link from 'next/link'
import { List, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
moment.locale('ko')
const PostSub = styled.h3`
    font-size: 1em;
    > span {
        color: #7579e7;
        font-weight: 600;
    }
`
function PostList({ posts }) {
    return (
        <List
            dataSource={posts}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            item.User.avatar ? (
                                <Avatar src={item.User.avatar} />
                            ) : (
                                <UserOutlined />
                            )
                        }
                        title={
                            <Link href="/post/[id]" as={`/post/${item.id}`}>
                                <a>
                                    <PostSub>
                                        {item.subject}&nbsp;&nbsp;
                                        <span>[{item.Comments.length}]</span>
                                    </PostSub>
                                </a>
                            </Link>
                        }
                        description={moment(item.createdAt).format(
                            'YYYY.MM.DD'
                        )}
                    />
                </List.Item>
            )}
        />
    )
}

export default PostList
