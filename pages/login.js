import React, { useCallback, useEffect } from 'react'
import wrapper from '../store/configureStore'
import axios from 'axios'

import { END } from 'redux-saga'
// import PropTypes from 'prop-types'
import CenteredLayout from '../components/CenteredLayout'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_REQUEST, LOAD_ME_REQUEST } from '../types/user'
import Router from 'next/router'
import Link from 'next/link'

const InputWrap = styled.div`
    padding: 25px 0;
    > label {
        display: block;
        padding-bottom: 10px;
    }
`

const login = () => {
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    const { me, logInError } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const onSubmit = useCallback(() => {
        dispatch({
            type: LOGIN_REQUEST,
            data: {
                email,
                password,
            },
        })
    }, [email, password])

    //redirection
    useEffect(() => {
        if (me && me.id) {
            Router.push('/')
        }
    }, [me && me.id])

    useEffect(() => {
        if (logInError) {
            alert(logInError)
        }
    }, [logInError])
    return (
        <CenteredLayout>
            <Form onFinish={onSubmit}>
                <InputWrap>
                    {/* <label htmlFor="user-email">이메일</label> */}
                    <Input
                        size="large"
                        name="user-email"
                        placeholder="이메일을 입력해주세요"
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </InputWrap>
                <InputWrap>
                    {/* <label htmlFor="user-password">비밀번호</label> */}
                    <Input
                        size="large"
                        name="user-password"
                        placeholder="패스워드를 입력해주세요"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                    />
                </InputWrap>
                <Button htmlType="submit">로그인</Button>
            </Form>
            <br />
            <br />
            <p>비밀번호를 잊으셨나요?</p>
            <br />
            <br />
            <Link href="/reset-password">비밀번호 재설정 이메일 보내기 🐰</Link>
        </CenteredLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        //서버쪽에서 실행시에는 context.req 존재

        const cookie = context.req ? context.req.headers.cookie : ''

        axios.defaults.headers.Cookie = ''

        if (context.req && cookie) {
            axios.defaults.headers.Cookie = cookie
        }
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)
export default login
