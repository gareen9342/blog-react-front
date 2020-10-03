import React, { useEffect, useState, useCallback, useRef } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import CenteredLayout from '../components/CenteredLayout'
import { Button } from 'antd'
const write = (props) => {
    const [value, setValue] = useState('')
    const { me } = useSelector((state) => state.user)

    useEffect(() => {
        if (!me && !me.id) {
            alert('글을 작성하려면 로그인이 필요합니다.')
            Router.push('/login')
        }
    }, [me && me.id])

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button
    ]

    const Quill =
        typeof window === 'object' ? require('react-quill') : () => false

    const handleEditor = useCallback((value) => {
        setValue(value)
    }, [])

    return (
        <CenteredLayout>
            {/* <Button onClick={handleSubmit}>submit</Button> */}
            <Quill
                value={value}
                onChange={handleEditor}
                theme="snow"
                modules={{ toolbar: toolbarOptions }}
                // formats={formats}
            />
        </CenteredLayout>
    )
}

write.propTypes = {}

export default write
