import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout, Input } from 'antd'
import { myMenus } from '../config/menus'
import Header from './Header'
import { HomeOutlined, FolderOutlined, CoffeeOutlined } from '@ant-design/icons'
const { Sider, Content, Footer } = Layout
const { Search } = Input

const GnbList = styled.ol`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`
const GnbListItem = styled.li`
    &.on a {
        color: #9896f1;
        // background-color: #f6f4e6;
    }
`
const IconCont = styled.span`
    display: block;
    width: 50px;
    height: 100%;
    line-height: 50px;
    text-align: center;
`
const GnbLink = styled.a`
    display: flex;
    align-items: center;
    text-align: left;
    height: 50px;
`

const SideBar = styled(Sider)`
    background-color: #fff;
    text-align: center;
    box-shadow: 3px 3px 15px rgba(30, 30, 30, 0.3);
    // &.ant-layout-sider {
    //     max-width: 300px !important;
    //     min-width: 300px !important;
    //     width: 300px !important;
    // }
`
const Section = styled(Layout)`
    background-color: #fff;
`
const Contents = styled(Content)`
    min-height: 100vh;
`
const SearchBar = styled(Search)`
    margin: 50px auto;
    width: 90%;
`
const FooterBar = styled(Footer)`
    background-color: #fff;
    text-align: center;
`
const AppLayout = ({ children }) => {
    const router = useRouter()
    const { category } = router.query
    const [collapsed, setCollapsed] = useState(true)
    const toggle = useCallback(() => {
        setCollapsed(!collapsed)
    }, [collapsed])

    const onSearch = useCallback((value) => {
        if (!value) {
            return alert('검색 키워드가 없습니다.')
        }
        router.push(`/search/${value}`)
    }, [])
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <SideBar
                    trigger={null}
                    width={300}
                    defaultCollapsed={true}
                    collapsedWidth="0"
                    collapsible
                    collapsed={collapsed}
                >
                    <SearchBar
                        placeholder="궁금한 내용을 검색해보세요"
                        onSearch={onSearch}
                        //   style={{ width: 200 }}
                    />

                    <GnbList>
                        <GnbListItem
                            className={router.pathname === '/' && 'on'}
                        >
                            <Link href="/">
                                <GnbLink>
                                    <IconCont>
                                        <HomeOutlined />
                                    </IconCont>
                                    &nbsp;Home
                                </GnbLink>
                            </Link>
                        </GnbListItem>
                        <GnbListItem
                            className={router.pathname === '/diary' && 'on'}
                        >
                            <Link href="/diary">
                                <GnbLink>
                                    <IconCont>
                                        <CoffeeOutlined />
                                    </IconCont>
                                    Daily Record
                                </GnbLink>
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
                                    <GnbLink>
                                        <IconCont>
                                            <FolderOutlined />
                                        </IconCont>
                                        {menu.menuName}
                                    </GnbLink>
                                </Link>
                            </GnbListItem>
                        ))}
                    </GnbList>
                </SideBar>
                {/* end sidebar */}
                <Section>
                    <Header toggle={toggle} collapsed={collapsed} />
                    <Contents>{children}</Contents>
                    <FooterBar>this site is made by Garin Jo </FooterBar>
                </Section>
                {/* end section */}
            </Layout>
        </>
    )
}

AppLayout.propTypes = {}

export default AppLayout
