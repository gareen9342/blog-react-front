import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Input, Button } from 'antd'
import guestbookService from '../services/guestbookService'
import useInput from '../hooks/useInput'
import useGuestbook from './useGuestbook'
const { TextArea } = Input

const GuestBookFormWrap = styled.div`
    position: absolute;
    padding: 20px 0 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 200px;
`
const InputWrap = styled.div``
const GuestBookInput = styled(Input)`
    /* width: 100% !important; */
    width: 45%;
    &::placeholder {
        font-size: 0.8em;
    }
`

/**
 *
 * test 1 : shouldFetch 를 이용해서 한다.
 *
 *
 */
function GuestBookForm() {
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [content, onChangeContent] = useInput('')
    const { guestbooks, mutate } = useGuestbook()
    const onPostGuestbook = useCallback(async () => {
        //email, password, content
        // setShouldFetch(false)
        try {
            let result = await guestbookService.postGuestbook({
                email,
                password,
                content,
            })
            mutate([...guestbooks, result], true)
        } catch (error) {
            console.error(error)
        }
    }, [email, password, content])

    return (
        <GuestBookFormWrap>
            <InputWrap>
                <GuestBookInput
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="이메일을 입력해주세요."
                />
                &nbsp; &nbsp;
                <GuestBookInput
                    value={password}
                    onChange={onChangePassword}
                    placeholder="수정, 삭제시 사용할 비밀번호를 입력해주세요."
                />
            </InputWrap>
            <br />
            <TextArea
                value={content}
                onChange={onChangeContent}
                showcount="true"
                maxLength={150}
            />
            <br />
            <br />
            <Button onClick={onPostGuestbook}>등록</Button>
        </GuestBookFormWrap>
    )
}

export default GuestBookForm
