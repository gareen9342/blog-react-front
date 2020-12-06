import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'
import CenteredLayout from '../components/CenteredLayout'
import { Title } from '../styles/common/UI'
import useInput from '../hooks/useInput'

import UserService from '../services/userService'
import Router from 'next/router'

function resetPassword() {
    const { me } = useSelector((state) => state.user)
    useEffect(() => {
        if (!(me && me.role)) {
            Router.push('/')
        }
    }, [me && me.id])
    const [email, onChangeEmail] = useInput('')
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

export default resetPassword
