import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import CenteredLayout from '../components/CenteredLayout'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../types/user'
import Router from 'next/router'
const InputWrap = styled.div`
    padding: 25px 0;
    > label {
        display: block;
        padding-bottom: 10px;
    }
`

const ErrorMessage = styled.p`
    color: #ff0000;
`
const signup = () => {
    const [email, onChangeEmail] = useInput('')
    const [name, onChangeName] = useInput('')
    const [password, onChangePassword] = useInput('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [term, setTerm] = useState('')
    const [termError, setTermError] = useState(false)

    const dispatch = useDispatch()
    const { signUpLoading, signUpDone, signUpError, me } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        if (signUpDone) {
            Router.push('/login')
        }
    }, [signUpDone])

    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value)
            setPasswordError(e.target.value !== password)
        },
        [password]
    )

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, name },
        })
    }, [password, passwordCheck])
    return (
        <CenteredLayout>
            <Form onFinish={onSubmit}>
                <InputWrap>
                    <label htmlFor="user-email">
                        로그인시 사용할 이메일을 작성해주세요
                    </label>
                    <Input
                        size="large"
                        name="user-email"
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </InputWrap>
                <InputWrap>
                    <label htmlFor="user-name">
                        사이트에서 사용할 닉네임을 적어주세요.
                    </label>
                    <Input
                        size="large"
                        name="user-name"
                        type="text"
                        value={name}
                        onChange={onChangeName}
                    />
                </InputWrap>
                <InputWrap>
                    <label htmlFor="user-password">
                        패스워드를 설정해 주세요.
                    </label>
                    <Input
                        size="large"
                        name="user-password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </InputWrap>
                <InputWrap>
                    <label htmlFor="user-password-check">
                        동일한 패스워드를 한 번 더 입력해 주세요.
                    </label>
                    <Input
                        size="large"
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        onChange={onChangePasswordCheck}
                    />
                </InputWrap>
                {passwordError && (
                    <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                )}
                {signUpLoading && <p>loading...</p>}
                <Button htmlType="submit">submit</Button>
            </Form>
        </CenteredLayout>
    )
}

export default signup
