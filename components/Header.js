import React, { useState, useEffect, useCallback } from 'react'
import { Menu, Dropdown, Button } from 'antd'

import styled from 'styled-components'
import Link from 'next/link'
import {
    DownOutlined,
    LeftOutlined,
    UserOutlined,
    EditOutlined,
    MenuOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { LOG_OUT_REQUEST } from '../types/user'
import Router from 'next/router'
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
    font-size: 15px;

    > a {
        // color: #9896f1;
        // font-weight: 600;
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
    // const darkMode = useDarkMode(true)
    // const [dark, setDark] = useState(null)
    // useEffect(() => {
    //     setDark(`${darkMode.value}`)
    //     return () => {}
    // }, [darkMode.value])

    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const onClickLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
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
                    <a>마가린의 블로그</a>
                </Link>
            </Logo>
            <RightBox>
                {/* <DarkModeBtn type="button" onClick={darkMode.toggle}>
                    🌙
                </DarkModeBtn> */}
                {me && me.id ? (
                    <Dropdown.Button
                        overlay={
                            <Menu>
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    <Link href={`/mypage`}>
                                        <a>마이페이지</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<EditOutlined />}>
                                    <Link href="/write">
                                        <a>글쓰기</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<UserOutlined />}>
                                    <Button onClick={onClickLogout}>
                                        로그아웃
                                    </Button>
                                </Menu.Item>
                            </Menu>
                        }
                        placement="bottomRight"
                        style={{ backgroundColor: 'transparent' }}
                        icon={<UserOutlined />}
                    ></Dropdown.Button>
                ) : (
                    <Dropdown.Button
                        overlay={
                            <Menu>
                                <Menu.Item>
                                    <Link href="/signup">
                                        <a>회원가입</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item>
                                    <Link href="/login">
                                        <a>로그인</a>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        }
                        placement="bottomRight"
                        style={{ backgroundColor: 'transparent' }}
                        icon={<UserOutlined />}
                    ></Dropdown.Button>
                )}
            </RightBox>
        </HeaderWrap>
    )
}

export default Header
