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
`
const { TextArea } = Input
function GuestBookList() {
    const [visible, setVisible] = useState(false)
    const [password, onChangePassword, setPassword] = useInput('')
    const [content, onChangeContent] = useInput('')
    const [lastId, setLastId] = useState(null)
    const { guestbooks, isLoading, loadGuestbookError, mutate } = useGuestbook()
    // lastId

    const handleVisibleChange = useCallback(() => {
        setVisible(!visible)
    }, [visible])
    const onEditGuestbook = useCallback(
        async (id) => {
            // let guestbook = guestbooks.find((x) => x.id === id)
            let result = await guestbookService.editGuestbook({
                id,
                password,
                content,
            })
            if (result.success) {
                setVisible(false)
                setPassword('')
            }
            mutate(guestbooks, true)
        },
        [password, content]
    )

    const [deletePassword, onChangeDeletePassword] = useInput('')
    const [deleteVisible, setDeleteVisible] = useState(false)

    const handleDeleteVisibleChange = useCallback(() => {
        setDeleteVisible(!deleteVisible)
    }, [deleteVisible])

    const onDeleteGuestbook = useCallback(
        async (id) => {
            console.log(id)
            let result = await guestbookService.deleteGuestbook({
                id,
                password: deletePassword,
            })
            if (result.success) {
                mutate(guestbooks, true)
                setVisible(true)
            }
        },
        [deletePassword]
    )
    return (
        <GuestBookListWrap>
            {/* {editSuccess} */}
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
                                content={
                                    <div>
                                        <Input
                                            type="password"
                                            value={deletePassword}
                                            onChange={onChangeDeletePassword}
                                        />
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
                {/* {console.log(guestbooks.length)} */}
                <Button
                    onClick={() => {
                        // console.log(guestbooks[guestbooks.length - 1].id)
                        setLastId(guestbooks[guestbooks.length - 1].id)
                        mutate(useGuestbook(lastId))
                    }}
                >
                    load more
                </Button>
            </div>
        </GuestBookListWrap>
    )
}

export default GuestBookList
