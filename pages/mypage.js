import React, { useEffect } from 'react'
import wrapper from '../store/configureStore'
import axios from 'axios'
import { END } from 'redux-saga'
import { useSelector } from 'react-redux'
import { LOAD_ME_REQUEST } from '../types/user'
import AppLayout from '../components/AppLayout'
import { CenterContainer, Title } from '../styles/common/UI'
import { Col, Row } from 'antd'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
    // const [user] = useLocalStorage('user')
    const router = useRouter()
    const { me } = useSelector((state) => state.user)
    useEffect(() => {
        if (!(me && me.id)) {
            router.push('/')
        }
    }, [me && me.id])

    return (
        <AppLayout>
            <CenterContainer>
                <Title>My Page</Title>
                <RowCont gutter={20}>
                    <Col lg={12} sm={24}>
                        {' '}
                        <br></br> <br></br>
                        <h3>개인 정보 변경</h3> <br></br>
                        <Link href="/change-password">
                            <a>비밀번호 변경하기</a>
                        </Link>
                        <br></br>
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

export default mypage
