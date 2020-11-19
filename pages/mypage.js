import React from 'react'
import AppLayout from '../components/AppLayout'
import { CenterContainer, Title } from '../styles/common/UI'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'

const RowCont = styled(Row)`
    padding-top: 50px;
`

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
                <RowCont gutter={20}>
                    <Col lg={12} sm={24}>
                        <h3>개인 정보 변경</h3>
                        <Link href="/change-password">
                            <a>비밀번호 변경하기</a>
                        </Link>
                    </Col>
                    <Col lg={12} sm={24}>
                        <h3>나의 활동</h3>
                        <p>준비중</p>
                    </Col>
                </RowCont>
            </CenterContainer>
        </AppLayout>
    )
}

export default mypage
