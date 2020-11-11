import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../components/AppLayout'
import { CenterContainer, SubTitle, Title } from '../styles/common/UI'
import { Input, Form, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { AUTH_ME_REQUEST } from '../types/user'
import Router from 'next/router'
const CenterCont = styled.div`
    text-align: center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-direction: column;
    form {
        width: 100%;
    }
    input {
        display: block;
        width: 80%;
        margin: 0 auto;
    }
`
function ChangePwd() {
    const dispatch = useDispatch()
    const { me, authMeError, authMeDone, authMeLoading } = useSelector(
        (state) => state.user
    )
    const [isAuth, setIsAuth] = useState(false)
    const [password, onChangePassword] = useInput('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState('')

    ///

    const [modifyPassword, onChangeModifyPassword] = useInput('')
    const [modifyPasswordCheck, setModifyPasswordCheck] = useState('')
    const [modifyPasswordErr, setModifyPasswordErr] = useState(false)

    /*
        로그인 하지 않은 유저 리다이렉팅
    */
    useEffect(() => {
        if (!(me && me.id)) {
            Router.push('/')
        }
    }, [me && me.id])

    /*
        패스워드 인증 완료 및 에러 없음
    */
    useEffect(() => {
        if (authMeDone && !authMeLoading) {
            setIsAuth(true)
        }
    }, [authMeDone, authMeLoading])

    /* 
    
    confirm password
    
    */
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value)
            setPasswordError(password !== e.target.value)
        },
        [password]
    )
    const onSubmitAuth = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        dispatch({
            type: AUTH_ME_REQUEST,
            data: { password: password },
        })
    }, [password, passwordCheck])

    /**
     * change password
     */

    const onSubmitChangePassword = useCallback(() => {
        console.log('change')
    }, [])
    /*
        error alert
    */
    useEffect(() => {
        if (authMeError) {
            alert(authMeError)
        }
    }, [authMeError])

    const onChangeModifyPasswordCheck = useCallback(
        (e) => {
            setModifyPasswordErr(modifyPassword !== e.target.value)
            setModifyPasswordCheck(e.target.value)
        },
        [modifyPassword]
    )
    return (
        <AppLayout>
            <CenterContainer>
                <Title>비밀번호 변경</Title>
                {isAuth ? (
                    <CenterCont>
                        <SubTitle>변경할 비밀번호를 입력해주세요.</SubTitle>
                        <Form onFinish={onSubmitChangePassword}>
                            <Input
                                placeholder="변경할 비밀번호"
                                value={modifyPassword}
                                onChange={onChangeModifyPassword}
                            />
                            <Input
                                placeholder="변경할 비밀번호를 한 번 더 입력해주세요"
                                value={modifyPasswordCheck}
                                onChange={onChangeModifyPasswordCheck}
                            />
                        </Form>
                        인증 끗
                    </CenterCont>
                ) : (
                    <CenterCont>
                        <SubTitle>본인 인증</SubTitle>
                        <Form onFinish={onSubmitAuth}>
                            <label htmlFor="password">
                                비밀번호를 입력해주세요.
                            </label>
                            <Input
                                placeholder="비밀번호를 입력해주세요"
                                onChange={onChangePassword}
                                value={password}
                            />
                            <Input
                                placeholder="비밀번호를 한 번 더 입력해주세요."
                                onChange={onChangePasswordCheck}
                                value={passwordCheck}
                            />
                            {passwordError && (
                                <p>비밀번호가 일치하지 않습니다.</p>
                            )}
                            <Button htmlType="submit">확인</Button>
                        </Form>
                    </CenterCont>
                )}
            </CenterContainer>
        </AppLayout>
    )
}

export default ChangePwd
