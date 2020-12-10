import React, { useState, useCallback } from 'react'
import { Card, Popover, Button, Input } from 'antd'
import styled from 'styled-components'
import guestbookService from '../services/guestbookService'
import useGuestbook from './useGuestbook'
import useInput from '../hooks/useInput'
const GuestBookListWrap = styled.div`
    height: calc(100% - 200px);
    padding: 0 13px;
    /* outline: 1px solid; */
    overflow-y: auto;
`
const ActionBtn = styled.button`
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    /* color: */
`
const { TextArea } = Input
function GuestBookList() {
    const [visible, setVisible] = useState(false)
    const [password, onChangePassword] = useInput('')
    const [content, onChangeContent] = useInput('')
    const { guestbooks, isLoading, loadGuestbookError, mutate } = useGuestbook()

    const handleVisibleChange = useCallback(() => {
        setVisible(!visible)
    }, [visible])
    const onEditGuestbook = useCallback(
        async (id) => {
            let guestbook = guestbooks.find((x) => x.id === id)
            const result = await guestbookService.editGuestbook({
                id,
                password,
                content,
            })
            // if (result) {
            //     guestbook = result
            // }
            mutate(guestbooks, true)
        },
        [password, content]
    )
    const hide = useCallback(() => {
        setVisible(false)
    }, [visible])
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
                            <Button size="small">delete</Button>
                        </Card>
                    ))}
            </div>
        </GuestBookListWrap>
    )
}

export default GuestBookList
