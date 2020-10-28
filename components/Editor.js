import React, { useState, useEffect, useMemo, useCallback } from 'react'
import NoSSR from 'react-no-ssr'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import axios from 'axios'
import { backUrl } from '../config/config'

const setContentsTest = (content) => {
    const blocksFromHtml = htmlToDraft(content)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
    )
    return EditorState.createWithContent(contentState)
}

const MyEditor = ({ content, setContent }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    useEffect(() => {
        if (content) {
            setEditorState(setContentsTest(content))
        }
        return () => {}
    }, [])
    const onEditorStateChange = useCallback((value) => {
        setEditorState(value)

        setContent(draftToHtml(convertToRaw(value.getCurrentContent())))
    }, [])

    const uploadImageCallBack = useCallback(async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        return axios
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
                // console.log(res.data)
                return { data: { link: res.data.url } }
            })
    }, [])
    // console.log(editorState)
    const wrapperStyleObject = useMemo(() => ({ border: '1px solid #eee' }), [])

    const editorStyleObject = useMemo(
        () => ({
            minHeight: 500,
            paddingLeft: 20,
            paddingRight: 20,
        }),
        []
    )

    const toolbarStyleObject = useMemo(
        () => ({
            // border: '1px solid #0ff',
        }),
        []
    )
    const myBlockRenderer = (contentBlock) => {
        const type = contentBlock.getType()
        if (type === 'atomic') {
            return {
                component: MediaComponent,
                editable: false,
                props: {
                    foo: 'bar',
                },
            }
        }
    }

    return (
        <>
            <NoSSR>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    blockRendererFn={myBlockRenderer}
                    toolbar={{
                        image: {
                            uploadCallback: uploadImageCallBack,
                            previewImage: true,
                            alt: { present: true, mandatory: false },
                        },
                    }}
                    wrapperStyle={wrapperStyleObject}
                    editorStyle={editorStyleObject}
                    toolbarStyle={toolbarStyleObject}
                />
            </NoSSR>
        </>
    )
}

const MediaComponent = (props) => {
    const { block, contentState } = props
    const data = contentState.getEntity(block.getEntityAt(0)).getData()

    const emptyHtml = ' '
    return (
        <div>
            {emptyHtml}
            <img
                src={data.src}
                alt={data.alt || ''}
                style={{
                    height: data.height || 'auto',
                    width: data.width || 'auto',
                }}
            />
        </div>
    )
}
export default MyEditor
