import React, { useCallback } from 'react'
import { Button } from 'antd'
import wrapper from '../../store/configureStore'
import styled from 'styled-components'
import Link from 'next/link'
import { LeftOutlined, MenuOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { LOG_OUT_REQUEST } from '../../types/user'
import Router from 'next/router'

import HeaderDropdown from './Dropdown'
import { DropdownOverlayLink, LogoutBtn } from './style'
const HeaderWrap = styled.div`
    height: 60px;
    position: relative;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
`
const RightBox = styled.div`
    display: flex;
    align-items: center;
`
const LeftBox = styled.div`
    display: flex;
    align-items: center;
`

const Logo = styled.h1`
    position: absolute;
    left: 50%;
    top: 50%;
    text-align: center;
    font-size: 1em;
    letter-spacing: 1px;

    > a {
        // color: #9896f1;
        letter-spacing: 1px;
        font-weight: 600;
        font-size: 1.2em;
        color: #7579e7;
    }
    transform: translate(-50%, -50%);
`
const NavBtn = styled(Button)`
    border: none;
    font-size: 1.3em;
    line-height: 1;
    &.ant-btn-text:active,
    &.ant-btn-text:focus {
        background: none;
    }
`

const Header = ({ toggle, collapsed }) => {
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const onClickLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
        setUser({})
        Router.push('/')
    }, [])

    return (
        <HeaderWrap>
            <LeftBox>
                <NavBtn type="text" onClick={toggle}>
                    {collapsed ? <MenuOutlined /> : <LeftOutlined />}
                </NavBtn>
            </LeftBox>
            <Logo>
                <Link href="/">
                    <a>SNOOPY'S BLOG</a>
                </Link>
            </Logo>
            <RightBox>
                <HeaderDropdown
                    overlay={
                        me && me.id ? (
                            <>
                                <Link href="/mypage">
                                    <DropdownOverlayLink>
                                        <span>my page</span>
                                    </DropdownOverlayLink>
                                </Link>
                                <Link href="/write">
                                    <DropdownOverlayLink>
                                        <span>write</span>
                                    </DropdownOverlayLink>
                                </Link>
                                <LogoutBtn onClick={onClickLogout}>
                                    logout
                                </LogoutBtn>
                            </>
                        ) : (
                            <>
                                <Link href="/signup">
                                    <DropdownOverlayLink>
                                        <span>회원가입</span>
                                    </DropdownOverlayLink>
                                </Link>
                                <Link href="/login">
                                    <DropdownOverlayLink>
                                        <span>로그인</span>
                                    </DropdownOverlayLink>
                                </Link>
                            </>
                        )
                    }
                />
            </RightBox>
        </HeaderWrap>
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

export default Header
/**
 *
 * db migration
 *
 *
 *
 *
 */
