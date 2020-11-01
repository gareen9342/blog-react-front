import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button, Input, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import AppLayout from '../components/AppLayout'
import CenteredLayout from '../components/CenteredLayout'
import dynamic from 'next/dynamic'
import SelectMenu from '../components/SelectMenu'
import { EDIT_POST_REQUEST } from '../types/post'

const Editor = dynamic(import('../components/Editor'), { ssr: false })

const EditPost = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { singlePost } = useSelector((state) => state.post)
    const [content, setContent] = useState(singlePost.content)
    const [category, setCategory] = useState('')

    const onSubmitPostEdit = useCallback(async () => {
        // const result = await postService.editPost({
        //     id: singlePost.id,
        //     content: content,
        //     category: category,
        // })
        // console.log(result)
        dispatch({
            type: EDIT_POST_REQUEST,
            data: {
                id: singlePost.id,
                content: content,
                category: category,
            },
        })
    }, [content, category])
    return (
        <CenteredLayout>
            <SelectMenu setCategory={setCategory} />
            <Editor content={content} setContent={setContent} />
            <Button onClick={onSubmitPostEdit}>수정하기</Button>
        </CenteredLayout>
    )
}

EditPost.propTypes = {
    //     post: PropTypes.shape({
    //     id: PropTypes.number,
    //     User: PropTypes.object,
    //     content: PropTypes.string,
    //     createdAt: PropTypes.string,
    //     Comments: PropTypes.arrayOf(PropTypes.object),
    //     Images: PropTypes.arrayOf(PropTypes.object),
    //     Likers: PropTypes.arrayOf(PropTypes.object),
    //     RetweetId: PropTypes.number,
    //     Retweet: PropTypes.objectOf(PropTypes.any),
    //   }).isRequired,
}

export default EditPost
