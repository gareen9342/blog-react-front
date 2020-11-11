import React from 'react'
import AppLayout from '../components/AppLayout'
import { CenterContainer, Title } from '../styles/common/UI'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
const InputWrap = styled.div`
    padding: 25px 0;
    > label {
        display: block;
        padding-bottom: 10px;
    }
`
const mypage = () => {
    return (
        <AppLayout>
            <CenterContainer>
                <Title>My Page</Title>

                <h3>개인 정보 수정</h3>
                <Link href="/change-password">
                    <a>비밀번호 변경하기</a>
                </Link>
            </CenterContainer>
        </AppLayout>
    )
}

export default mypage
