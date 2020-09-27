import React from 'react'
import styled from 'styled-components'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import AppLayout from '../components/AppLayout'
const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const InputWrap = styled.div``
const signup = () => {
    const [email, onChangeEmail] = useInput('')
    return (
        <AppLayout>
            <CenteredContainer>
                <InputWrap>
                    <label htmlFor="user-email">
                        로그인시 사용할 이메일을 작성해주세요
                    </label>
                    <br />
                    <Input
                        name="user-email"
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                    />
                </InputWrap>
            </CenteredContainer>
        </AppLayout>
    )
}

export default signup
