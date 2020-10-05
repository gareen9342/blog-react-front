import React, { useEffect, useState, useCallback, useRef } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import CenteredLayout from '../components/CenteredLayout'
import Dropzone, { ImageFile } from 'react-dropzone'
import { Button } from 'antd'
import Head from 'next/head'
const write = (props) => {
    const { me } = useSelector((state) => state.user)

    // useEffect(() => {
    //     if (!me || !me.id) {
    //         alert('글을 작성하려면 로그인이 필요합니다.')
    //         Router.push('/login')
    //     }
    //     console.log(me)
    // }, [me && me.id])

    /************* quill *************/
    const Quill =
        typeof window === 'object' ? require('react-quill') : () => false
    const dropzoneRef = useRef()

    // console.log(dropzoneRef)
    const onDrop = (e) => {
        alert('opened')
        console.log(e)
    }
    const openDialog = useCallback(() => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    }, [dropzoneRef])
    const modules = {
        toolbar: {
            container: [
                [{ header: '1' }, { header: '2' }, { font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [
                    { list: 'ordered' },
                    { list: 'bullet' },
                    { indent: '-1' },
                    { indent: '+1' },
                ],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            handlers: { image: openDialog },
            clipboard: {
                // toggle to add extra line breaks when pasting HTML:
                matchVisual: false,
            },
        },
    }
    /*
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ]
    const [value, setValue] = useState('')

    return (
        <>
            <CenteredLayout>
                {/* <Button onClick={handleSubmit}>submit</Button> */}
                <Quill
                    value={value}
                    onChange={setValue}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    // formats={formats}
                />
                <Dropzone ref={dropzoneRef} noClick noKeyboard>
                    {({ getRootProps, getInputProps, acceptedFiles }) => {
                        return (
                            <div className="container">
                                <div
                                    {...getRootProps({ className: 'dropzone' })}
                                >
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here</p>
                                    <button type="button" onClick={openDialog}>
                                        Open File Dialog
                                    </button>
                                </div>
                                <aside>
                                    <h4>Files</h4>
                                    <ul>
                                        {acceptedFiles.map((file) => (
                                            <li key={file.path}>
                                                {file.path} - {file.size} bytes
                                            </li>
                                        ))}
                                    </ul>
                                </aside>
                            </div>
                        )
                    }}
                </Dropzone>
            </CenteredLayout>
        </>
    )
}

write.propTypes = {}

export default write
