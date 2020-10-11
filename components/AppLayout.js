import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { myMenus } from '../config/menus'
import Header from './Header'

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
`
const GnbListItem = styled.li``

const GnbLink = styled.a`
    padding: 10px 15px;
    display: block;
`
const Content = styled.div`
    width: calc(100% - 255px);
    padding: 0 20px;
`

const AppLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Wrapper>
                <Sidebar>
                    <GnbList>
                        <GnbListItem>
                            <Link href="/">
                                <GnbLink>Home</GnbLink>
                            </Link>
                        </GnbListItem>
                        {myMenus.map((menu) => (
                            <GnbListItem key={menu.key}>
                                <Link
                                    href="/post/[...category]"
                                    as={`/post/${menu.name_hidden}`}
                                >
                                    <GnbLink>{menu.menuName}</GnbLink>
                                </Link>
                            </GnbListItem>
                        ))}
                        <Link href="/post/[...category]" as={'/post/1/ddd'}>
                            <a>testest</a>
                        </Link>
                    </GnbList>
                </Sidebar>
                <Content>{children}</Content>
            </Wrapper>
        </>
    )
}

AppLayout.propTypes = {}

export default AppLayout
