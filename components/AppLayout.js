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
                        {myMenus.map((item) => (
                            <GnbListItem key={item.key}>
                                <Link href={`/post/${item.selectValue}`}>
                                    <GnbLink>{item.menuName}</GnbLink>
                                </Link>
                            </GnbListItem>
                        ))}
                    </GnbList>
                </Sidebar>
                <Content>{children}</Content>
            </Wrapper>
        </>
    )
}

AppLayout.propTypes = {}

export default AppLayout
