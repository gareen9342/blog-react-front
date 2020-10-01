import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, message, Tooltip, Button } from 'antd'
import useDarkMode from 'use-dark-mode'

import styled from 'styled-components'
import { Switch } from 'antd'
import Link from 'next/link'
import { DownOutlined, UserOutlined, EditOutlined } from '@ant-design/icons'
import useInput from '../hooks/useInput'
import { BORDER } from '../styles/common/Theme'
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
`
const LeftBox = styled.div`
    display: flex;
`
const DarkModeBtn = styled(Button)`
    background-color: transparent;
    border: ${BORDER};
`

const Logo = styled.h1`
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 15px;
    transform: translate(-50%, -50%);
`
const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useInput(false)
    const darkMode = useDarkMode(true)
    // const [dark, setDark] = useState(null)
    // useEffect(() => {
    //     setDark(`${darkMode.value}`)
    //     return () => {}
    // }, [darkMode.value])
    return (
        <HeaderWrap>
            <LeftBox></LeftBox>
            <Logo>
                <Link href="/">
                    <a>마가린의 블로그입니다.</a>
                </Link>
            </Logo>
            <RightBox>
                <DarkModeBtn type="button" onClick={darkMode.toggle}>
                    🌙
                </DarkModeBtn>
                {isLoggedIn ? (
                    <Dropdown.Button
                        overlay={
                            <Menu>
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    <Link href={`posts/mypage`}>
                                        <a>마이페이지</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3" icon={<EditOutlined />}>
                                    <Link href="/write">
                                        <a>글쓰기</a>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<UserOutlined />}>
                                    <Button>로그아웃</Button>
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
