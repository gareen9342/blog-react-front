import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { myMenus } from '../config/menus'
import Header from './Header'
import { useRouter } from 'next/router'
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
const GnbListItem = styled.li`
    &.on a {
        color: #f00 !important;
    }
`

const GnbLink = styled.a`
    padding: 10px 15px;
    display: block;
`
const Content = styled.div`
    width: calc(100% - 255px);
    padding: 0 20px;
`

const AppLayout = ({ children }) => {
    const router = useRouter()
    const { category } = router.query
    return (
        <>
            <Header />
            <Wrapper>
                <Sidebar>
                    <GnbList>
                        <GnbListItem
                            className={router.pathname === '/' && 'on'}
                        >
                            <Link href="/">
                                <GnbLink>Home</GnbLink>
                            </Link>
                        </GnbListItem>
                        {myMenus.map((menu) => (
                            <GnbListItem
                                key={menu.key}
                                className={`${
                                    menu.name_hidden.includes(category) && 'on'
                                }`}
                            >
                                <Link
                                    href="/post/[category]"
                                    as={`/post/${menu.name_hidden}`}
                                >
                                    <GnbLink>{menu.menuName}</GnbLink>
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
