import React, { useMemo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from '@ant-design/icons'
import Header from './Header'
import useDarkMode from 'use-dark-mode'

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Sidebar = styled.div`
    width: 255px;
`
const GnbList = styled.ol`
    display: flex;
    flex-direction: column;
    li {
        outline: 1px solid;
    }
`
const GnbListItem = styled.li``

const GnbLink = styled.a`
    padding: 10px 15px;
    display: block;
`
const Content = styled.div`
    width: calc(100% - 255px);
    padding: 0 20px;
    outline: 1px solid;
`

const AppLayout = ({ children }) => {
    const darkMode = useDarkMode(true)

    const style = useMemo(
        () => ({
            color: darkMode.value ? 'hsla(0, 0%, 100%, 0.65)' : '#000',
        }),
        [darkMode.value]
    )

    const arrMenus = [
        {
            menuName: 'Home',
            key: 'Home',
            href: '/',
        },
        {
            menuName: '일상',
            key: 'Daily',
            href: '/daily',
            subMenus: [
                {
                    key: '1',
                    name: 'option1',
                },
                {
                    key: '2',
                    name: 'option2',
                },
                {
                    key: '3',
                    name: 'option3',
                },
            ],
        },
    ]
    return (
        <>
            <Header />
            <Wrapper>
                <Sidebar>
                    <GnbList>
                        {arrMenus.map((item) => (
                            <GnbListItem key={item.key}>
                                <Link href={item.href}>
                                    <GnbLink style={style}>
                                        {item.menuName}
                                    </GnbLink>
                                </Link>
                            </GnbListItem>
                        ))}
                    </GnbList>
                </Sidebar>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    Content
                </Content>
            </Wrapper>
        </>
    )
}

AppLayout.propTypes = {}

export default AppLayout
