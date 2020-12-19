import React, { useCallback, useEffect } from 'react'
import wrapper from '../store/configureStore'
import axios from 'axios'
import { END } from 'redux-saga'
//
import { useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'
import CenteredLayout from '../components/CenteredLayout'
import { Title } from '../styles/common/UI'
import useInput from '../hooks/useInput'

import UserService from '../services/userService'
import { LOAD_ME_REQUEST } from '../types/user'
import Router from 'next/router'

function resetPassword() {
    const { me } = useSelector((state) => state.user)
    const [email, onChangeEmail] = useInput('')
    useEffect(() => {
        if (me && me.id) {
            Router.push('/')
        }
    }, [me && me.id])
    const onSubmitResetPassword = useCallback(async () => {
        let result = await UserService.resetPassword({ email: email })

        if (result.success) {
            alert(result.message)
            setTimeout(() => {
                return Router.push('/login')
            }, 2000)
        } else {
            return alert(result.message)
        }
    }, [email])

    return (
        <CenteredLayout>
            <Title>비밀번호 재설정</Title>
            <br />
            <br />
            <Form onFinish={onSubmitResetPassword}>
                <Input
                    placeholder="가입시 사용했던 이메일 주소를 입력해주세요."
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                />
                <br />
                <br />
                <br />
                <Button htmlType="submit">확인</Button>
            </Form>
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

export default resetPassword
