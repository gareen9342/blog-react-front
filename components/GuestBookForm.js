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

function GuestBookForm() {
    const [email, onChangeEmail, setEmail] = useInput('')
    const [password, onChangePassword, setPassword] = useInput('')
    const [content, onChangeContent, setContent] = useInput('')
    const { guestbooks, mutate, loadGuestbookError } = useGuestbook()
    const onPostGuestbook = useCallback(async () => {
        if (!email || !password || !content) {
            return alert('필드를 모두 채워주세요 ')
        }
        const regExp = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
        if (!regExp.test(email)) {
            return alert('이메일 주소가 유효하지 않습니다.')
        }
        //email, password, content
        let result = await guestbookService.postGuestbook({
            email,
            password,
            content,
        })
        // console.log(result)
        if (result.message && !result.success) {
            return alert(result.message)
        }
        mutate([...guestbooks, result], true)
        alert('방명록이 성공적으로 업로드 되었습니다.')
        setEmail('')
        setPassword('')
        setContent('')
    }, [email, password, content])

    return (
        <GuestBookFormWrap>
            <InputWrap>
                <GuestBookInput
                    name="user-email"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    placeholder="이메일을 입력해주세요."
                />
                &nbsp; &nbsp;
                <GuestBookInput
                    maxlength="10"
                    type="password"
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
