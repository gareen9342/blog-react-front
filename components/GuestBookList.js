import React, { useState, useEffect, useCallback } from 'react'
import { Card, Popover, Button, Input } from 'antd'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import {
    DELETE_GUESTBOOK_REQUEST,
    EDIT_GUESTBOOK_REQUEST,
    LOAD_GUESTBOOKS_REQUEST,
} from '../types/guestbook'
import useInput from '../hooks/useInput'

const GuestBookListWrap = styled.div`
    height: calc(100% - 200px);
    overflow-y: auto;
    border: 1px solid #d9d9d9;
`

const { TextArea } = Input
function GuestBookList() {
    const [visible, setVisible] = useState(false)
    const [password, onChangePassword, setPassword] = useInput('')
    const [content, onChangeContent, setContent] = useInput('')
    const [deletePassword, onChangeDeletePassword] = useInput('')
    const [deleteVisible, setDeleteVisible] = useState(false)
    //======data fetching=====//
    const {
        loadGuestbooksLoading,
        guestbooksList: guestbooks,
        editGuestbookError,
        deleteGuestbookError,
    } = useSelector((state) => state.guestbook)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: LOAD_GUESTBOOKS_REQUEST,
        })
    }, [])

    //============ functions ============//
    const handleVisibleChange = useCallback(() => {
        setVisible(!visible)
    }, [visible])

    const onEditGuestbook = useCallback(
        (id) => {
            dispatch({
                type: EDIT_GUESTBOOK_REQUEST,
                data: { id, password, content },
            })
            setPassword('')
            setContent('')
        },
        [password, content]
    )

    const handleDeleteVisibleChange = useCallback(() => {
        setDeleteVisible(!deleteVisible)
    }, [deleteVisible])
    const onDeleteGuestbook = useCallback(
        (id) => {
            dispatch({
                type: DELETE_GUESTBOOK_REQUEST,
                data: { id, password: deletePassword },
            })
        },
        [deletePassword]
    )

    useEffect(() => {
        if (editGuestbookError) {
            alert('방명록을 수정중 에러가 발생합니다.')
        }
    }, [editGuestbookError])

    useEffect(() => {
        if (deleteGuestbookError) {
            alert(deleteGuestbookError)
        }
    }, [deleteGuestbookError])
    return (
        <GuestBookListWrap>
            <div>
                {loadGuestbooksLoading ? 'loading...' : ''}
                {guestbooks &&
                    guestbooks.length > 0 &&
                    guestbooks.map((item) => (
                        <Card
                            key={item.id}
                            style={{ borderLeft: 'none', borderRight: 'none ' }}
                        >
                            <div>{item.content}</div>
                            <br />
                            <br />
                            <Popover
                                content={
                                    <div>
                                        <Input
                                            onChange={onChangePassword}
                                            value={password}
                                            type="password"
                                            maxLength={10}
                                            placeholder="비밀번호를 입력해주세요."
                                        />
                                        <br />
                                        <br />
                                        <TextArea
                                            onChange={onChangeContent}
                                            value={content}
                                            defaultValue={item.content}
                                            placeholder="내용 작성란"
                                        />
                                        <br />
                                        <br />
                                        <Button
                                            size="small"
                                            onClick={() =>
                                                onEditGuestbook(item.id)
                                            }
                                        >
                                            제출
                                        </Button>
                                    </div>
                                }
                                trigger="click"
                                title="수정하기"
                                onVisibleChange={handleVisibleChange}
                            >
                                <Button
                                    // onClick={() => handleEditButton(item.id)}
                                    size="small"
                                    onClick={handleVisibleChange}
                                >
                                    edit
                                </Button>
                            </Popover>
                            &nbsp;&nbsp;
                            <Popover
                                trigger="click"
                                title="삭제하기"
                                content={
                                    <div>
                                        <Input
                                            type="password"
                                            placeholder="비밀번호 입력"
                                            maxLength={10}
                                            value={deletePassword}
                                            onChange={onChangeDeletePassword}
                                        />
                                        <br />
                                        <br />
                                        <Button
                                            onClick={() =>
                                                onDeleteGuestbook(item.id)
                                            }
                                            size="small"
                                        >
                                            정말로 삭제하시겠습니까?
                                        </Button>
                                    </div>
                                }
                            >
                                <Button
                                    onClick={handleDeleteVisibleChange}
                                    size="small"
                                >
                                    delete
                                </Button>
                            </Popover>
                        </Card>
                    ))}
            </div>
        </GuestBookListWrap>
    )
}

export default GuestBookList
