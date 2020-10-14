import React, { useState, useCallback, useEffect, useRef } from 'react'
import CenteredLayout from '../components/CenteredLayout'
import FileUpload from '../components/FileUpload'
import { Input, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { UPLOAD_DIARY_REQUEST } from '../types/diary'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'

const SubmitBtn = styled(Button)`
    margin-top: 30px;
    background-color: #f58f3e;
    color: #fff;
`

function DiaryWriteForm() {
    const { TextArea } = Input
    const [images, setImages] = useState('')
    const [content, onChangeContent] = useInput('')
    const {
        uploadDiaryLoading,
        uploadDiaryDone,
        uploadDiaryError,
    } = useSelector((state) => state.diary)
    const uploadImageFunction = useCallback(
        (imagesArray) => {
            setImages(imagesArray)
        },
        [images]
    )
    const dispatch = useDispatch()
    const onSubmit = useCallback(() => {
        if (!content) {
            return alert('텍스트 작성란을 기입해주세요')
        }
        dispatch({
            type: UPLOAD_DIARY_REQUEST,
            data: {
                content,
                images,
            },
        })
    }, [content, images])

    useEffect(() => {
        if (!uploadDiaryLoading && uploadDiaryDone) {
            alert('성공적으로 다이어리가 업로드 되었습니다.')
            Router.push('/diary')
        }
    }, [uploadDiaryLoading, uploadDiaryDone])
    useEffect(() => {
        if (uploadDiaryError) {
            alert(uploadDiaryError)
        }
    }, [uploadDiaryError])
    return (
        <CenteredLayout>
            <div>
                <FileUpload uploadImageFunction={uploadImageFunction} />
                <br />
                <TextArea
                    value={content}
                    onChange={onChangeContent}
                    showcount="true"
                    maxLength={100}
                />
                <SubmitBtn onClick={onSubmit}>하루 한 줄 남기기</SubmitBtn>
            </div>
        </CenteredLayout>
    )
}

export default DiaryWriteForm
