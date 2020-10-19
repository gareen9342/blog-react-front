import React, { useState, useCallback, useRef } from 'react'

import Dropzone from 'react-dropzone'
import axios from 'axios'
import { PlusOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { backUrl } from '../config/config'
const FileUploadWrap = styled.div`
    height: 300px;
    display: flex;
    justify-content: space-between;
`

const DropzoneWrap = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
`

const PreviewWrap = styled.div`
    width: 300px;
    height: 300px;
    border: 1px solid #e6e6e6;
    overflow-x: scroll;
    overflow-y: hidden;
    > div {
        width: auto;
    }
`

const PreviewImgFrame = styled.div`
    width: 300px;
    height: 300px;
    float: left;
    position: relative;
    overflow: hidden;
`

const PreviewImg = styled.img`
    width: 100%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    vertical-align: top;
`

function FileUpload(props) {
    const [Images, setImages] = useState([])
    const dropzoneRef = useRef()
    const dropHandler = useCallback(
        (files) => {
            let formData = new FormData()
            // const config = {
            //     header: {
            //         'content-type': 'multipart/form-data',
            //     },
            // }
            formData.append('image', files[0])

            axios
                .post(
                    `${
                        process.env.NODE_ENV === 'production'
                            ? backUrl
                            : 'http://localhost:80'
                    }/post/image`,
                    formData,
                    {
                        withCredentials: true,
                    }
                )
                .then((res) => {
                    if (res.data.success) {
                        setImages([...Images, res.data.url])
                        props.uploadImageFunction([...Images, res.data.url])
                    } else {
                        alert('파일을 저장하는 데에 실패했습니다.')
                    }
                })
        },
        [Images]
    )
    const deleteHandler = useCallback(
        (image) => {
            let newImages = [...Images]
            setImages(newImages.filter((x) => x !== image))
            // console.log(Images)
            props.uploadImageFunction(Images)
        },
        [Images]
    )
    return (
        <FileUploadWrap>
            <Dropzone onDrop={dropHandler} ref={dropzoneRef}>
                {({ getRootProps, getInputProps }) => (
                    <DropzoneWrap {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PlusOutlined color="#000" />
                    </DropzoneWrap>
                )}
            </Dropzone>
            <PreviewWrap>
                <div style={{ width: Images.length * 300 }}>
                    {Images.map((img, idx) => (
                        <PreviewImgFrame
                            key={idx}
                            onClick={() => deleteHandler(img)}
                        >
                            <PreviewImg
                                src={`${img.replace(
                                    /\/thumb\//,
                                    '/original/'
                                )}`}
                            />
                        </PreviewImgFrame>
                    ))}
                </div>
            </PreviewWrap>
        </FileUploadWrap>
    )
}

export default FileUpload
