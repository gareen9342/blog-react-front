import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Button, Input, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import CenteredLayout from '../components/CenteredLayout'
import dynamic from 'next/dynamic'
import SelectMenu from '../components/SelectMenu'
import { EDIT_POST_REQUEST } from '../types/post'
import useInput from '../hooks/useInput'
const Editor = dynamic(import('../components/Editor'), { ssr: false })

const EditPost = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { singlePost } = useSelector((state) => state.post)
    const { me } = useSelector((state) => state.user)
    const [content, setContent] = useState(singlePost.content)
    const [category, setCategory] = useState(singlePost?.Category?.name_hidden)
    const [subject, onChangeSubject] = useInput(singlePost.subject)

    useEffect(() => {
        if (!(me && me.role)) {
            router.push('/')
        }
    }, [me && me.role])
    const onSubmitPostEdit = useCallback(() => {
        dispatch({
            type: EDIT_POST_REQUEST,
            data: {
                id: singlePost.id,
                content: content,
                subject,
                category: category,
            },
        })
    }, [content, category, subject])
    return (
        <CenteredLayout>
            <SelectMenu setCategory={setCategory} initialValue={category} />
            <Input value={subject} onChange={onChangeSubject} />
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
