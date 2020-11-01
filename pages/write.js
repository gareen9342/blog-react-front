import React, { useEffect, useState, useCallback, useRef } from 'react'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import CenteredLayout from '../components/CenteredLayout'
import { Button, Input, Select } from 'antd'
import useInput from '../hooks/useInput'
import dynamic from 'next/dynamic'
import { UPLOAD_POST_REQUEST } from '../types/post'

import AddCategoryForm from '../components/AddCategoryForm'
import SelectMenu from '../components/SelectMenu'
const Editor = dynamic(import('../components/Editor'), { ssr: false })

const write = (props) => {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const { uploadPostLoading, uploadPostDone, uploadPostError } = useSelector(
        (state) => state.post
    )
    useEffect(() => {
        if (!(me && me.role == 1)) {
            Router.push('/')
        }
    }, [me && me.role])

    /*
    addCategory
    name_hidden: req.body.name_hidden, // number
      name_show: req.body.name_show,
    */

    /********* submit */
    const [subject, onChangesubject] = useInput('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [hashTag, onChangeHashTag] = useInput('')

    const handleSubmit = useCallback(() => {
        if (!subject || !category || !content) {
            return alert(
                '필수 영역을 모두 작성해 주세요. (제목, 카테고리, 내용)'
            )
        }
        dispatch({
            type: UPLOAD_POST_REQUEST,
            data: { subject, category, content, hashtag: hashTag },
        })
    }, [content, category, subject, hashTag])

    useEffect(() => {
        if (uploadPostError) {
            alert(uploadPostError)
        }
    }, [uploadPostError])

    useEffect(() => {
        if (!uploadPostLoading && uploadPostDone) {
            alert('포스팅이 성공적으로 완료되었습니다.')
            Router.push('/')
        }
    }, [uploadPostDone, uploadPostLoading])

    return (
        <>
            <CenteredLayout>
                <AddCategoryForm />
                <SelectMenu setCategory={setCategory} />
                <br />
                <Input
                    value={subject}
                    onChange={onChangesubject}
                    placeholder={'제목을 입력해 주세요'}
                />
                <br />
                <Editor content={content} setContent={setContent} />
                <Input
                    value={hashTag}
                    onChange={onChangeHashTag}
                    placeholder="해시태그를 #을 이용해 넣어주세요."
                />
                <br />
                <Button onClick={handleSubmit}>submit</Button>
            </CenteredLayout>
        </>
    )
}

write.propTypes = {}

export default write
