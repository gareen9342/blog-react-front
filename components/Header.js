import React, { useState, useEffect } from 'react'
import { Menu, Dropdown, message, Tooltip, Button } from 'antd'
import useDarkMode from 'use-dark-mode'

import styled from 'styled-components'
import { Switch } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import useInput from '../hooks/useInput'
const HeaderWrap = styled.div`
    height: 60px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const RightBox = styled.div`
    display: flex;
`
const LeftBox = styled.div`
    display: flex;
`

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useInput(true)
    const darkMode = useDarkMode(true)
    const [dark, setDark] = useState(darkMode.value)
    useEffect(() => {
        setDark(`${darkMode.value}`)
        return () => {}
    }, [darkMode.value])
    return (
        <HeaderWrap>
            <LeftBox>
                {/* <Switch
                    // defaultChecked
                    checked={darkMode.value}
                    onChange={darkMode.toggle}
                /> */}
                {`${dark}`}
                <button type="button" onClick={darkMode.toggle}>
                    ☾
                </button>
            </LeftBox>
            <RightBox>
                {isLoggedIn ? (
                    <Dropdown.Button
                        overlay={
                            <Menu>
                                <Menu.Item key="1" icon={<UserOutlined />}>
                                    My Page
                                </Menu.Item>
                                <Menu.Item key="2" icon={<UserOutlined />}>
                                    Log out
                                </Menu.Item>
                            </Menu>
                        }
                        placement="bottomCenter"
                        icon={<UserOutlined />}
                    ></Dropdown.Button>
                ) : (
                    <Button>
                        <Link href="/signup">
                            <a>회웝가입</a>
                        </Link>
                    </Button>
                )}
            </RightBox>
        </HeaderWrap>
    )
}

export default Header
