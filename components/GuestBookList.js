import React, { useState, useEffect, useCallback } from 'react'
import { Card, Popover, Button, Input } from 'antd'
import styled from 'styled-components'
import guestbookService from '../services/guestbookService'
import useGuestbook from './useGuestbook'
import useInput from '../hooks/useInput'

const GuestBookListWrap = styled.div`
    height: calc(100% - 200px);
    /* padding: 0 13px; */
    /* outline: 1px solid; */
    overflow-y: auto;
`

const { TextArea } = Input
function GuestBookList() {
    const [visible, setVisible] = useState(false)
    const [password, onChangePassword, setPassword] = useInput('')
    const [content, onChangeContent, setContent] = useInput('')
    const [
        deletePassword,
        onChangeDeletePassword,
        setDeletePassword,
    ] = useInput('')
    const [deleteVisible, setDeleteVisible] = useState(false)
    // data fetching
    const {
        guestbooks,
        isLoading,
        loadGuestbookError,
        mutate,
        uri,
    } = useGuestbook()

    const handleVisibleChange = useCallback(() => {
        setVisible(!visible)
    }, [visible])
    const onEditGuestbook = useCallback(
        async (id) => {
            let result = await guestbookService.editGuestbook({
                id,
                password,
                content,
            })
            if (!result.success && result.message) {
                return alert(result.message)
            }
            if (result.success) {
                setVisible(false)
                setContent('')
                setPassword('')
                alert('수정되었습니다')
                mutate(guestbooks, true)
            }
        },
        [password, content]
    )

    const handleDeleteVisibleChange = useCallback(() => {
        setDeleteVisible(!deleteVisible)
    }, [deleteVisible])
    const onDeleteGuestbook = useCallback(
        async (id) => {
            let result = await guestbookService.deleteGuestbook({
                id,
                password: deletePassword,
            })
            if (!result.success && result.message) {
                setDeletePassword('')
                return alert(result.message)
            }
            if (result.success) {
                const filteredData = guestbooks.filter((x) => x.id !== id)
                mutate(filteredData, true)
                setDeletePassword('')
            }
        },
        [deletePassword]
    )
    return (
        <GuestBookListWrap>
            <div>
                {guestbooks &&
                    guestbooks.length > 0 &&
                    guestbooks.map((item) => (
                        <Card key={item.id}>
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
                                            maxlength="10"
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
                                title="수정하기"
                                content={
                                    <div>
                                        <Input
                                            type="password"
                                            placeholder="비밀번호 입력"
                                            maxlength="10"
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
