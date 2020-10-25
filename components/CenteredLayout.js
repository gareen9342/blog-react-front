import React from 'react'
import Header from './Header'
import styled from 'styled-components'
import { Row, Col } from 'antd'
const CenteredContainer = styled.div`
    display: flex;
    padding: 100px 0;
    text-align: center;
    flex-direction: column;
    justify-content: center;
`
const CenteredLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Row justify="center">
                <Col span={12}>
                    <CenteredContainer>{children}</CenteredContainer>
                </Col>
            </Row>
        </>
    )
}

CenteredLayout.propTypes = {}

export default CenteredLayout
