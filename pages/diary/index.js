import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../../components/AppLayout'
import styled from 'styled-components'
import { Button, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import { LOAD_DIARIES_REQUEST } from '../../types/diary'
import moment from 'moment'

import Modal from '../../components/Modal'
import ImgSlider from '../../components/ImgSlider'
import { CenterContainer, Title, SubTitle } from '../../styles/common/UI'

const TopArea = styled.div`
    position: relative;
    padding: 30px 0;
    margin: 30px 0;
    border-bottom: 1px solid #e6e6e6;
`
const TopNav = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0 0 30px;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 0 30px;
`

const CardListItem = styled.div`
    // width: calc(33.333% - 16px);
    height: 300px;
    border: 1px solid #e6e6e6;
    margin-bottom: 30px;
    position: relative;
`
const CardListDate = styled.p`
    font-size: 1.3em;
    line-height: 1.5;
    padding: 8px 0 30px;
    text-align: center;
    > span {
        color: #ff6176;
        font-size: 0.9em;
        font-weight: 600;
    }
`
const ParaGraph = styled.h3`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    max-width: 80%;
    word-break: keep-all;
    word-wrap: break-word;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 1.8em;
`
const WriteBtn = styled(Button)``
const MoreBtn = styled(Button)``
moment.locale('ko')
function Daily() {
    const router = useRouter()
    const dispatch = useDispatch()
    const { me } = useSelector((state) => state.user)
    const { diaryList, hasMorePosts, loadDiariesLoading } = useSelector(
        (state) => state.diary
    )

    const onClickWrite = useCallback(() => {
        router.push('/diary-write')
    }, [])

    useEffect(() => {
        dispatch({
            type: LOAD_DIARIES_REQUEST,
        })
    }, [])

    const loadMore = useCallback(() => {
        if (hasMorePosts && !loadDiariesLoading) {
            const lastId = diaryList[diaryList.length - 1]?.id
            dispatch({
                type: LOAD_DIARIES_REQUEST,
                lastId,
            })
        }
    }, [hasMorePosts, loadDiariesLoading])

    // modal
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})
    const openModal = useCallback(
        (data) => () => {
            setModalData(data)
            setModalVisible(true)
        },
        [modalVisible, modalData]
    )
    const closeModal = useCallback(() => {
        setModalVisible(false)
    }, [modalVisible])
    return (
        <AppLayout>
            <CenterContainer>
                <Modal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}
                    bgColor={'rgba(0,0,0,0.3)'}
                    children={modalData}
                />
                <TopArea>
                    <Title textAlign={'center'}>My Daily Record</Title>
                    <SubTitle textAlign={'center'}>
                        하루에 한 줄을 기록합니다 :)
                    </SubTitle>
                </TopArea>
                {/* {me && me.id &&} */}
                <TopNav>
                    <WriteBtn onClick={onClickWrite}>write</WriteBtn>
                </TopNav>
                <Row gutter={16}>
                    {diaryList.length > 0 &&
                        diaryList.map((diary) => (
                            <Col key={diary.id} span={8}>
                                <CardListItem onClick={openModal(diary)}>
                                    {diary.Images && (
                                        <ImgSlider images={diary.Images} />
                                    )}

                                    <ParaGraph>{diary.content}</ParaGraph>
                                </CardListItem>

                                <CardListDate>
                                    {moment(diary.createdAt).format(
                                        'YYYY.MM.DD'
                                    )}
                                    {/* <br /> */}
                                    {/* <span>{diaryList.length - idx}</span> */}
                                </CardListDate>
                            </Col>
                        ))}
                </Row>

                {hasMorePosts && !loadDiariesLoading && (
                    <MoreBtn onClick={loadMore}>더보기</MoreBtn>
                )}
            </CenterContainer>
        </AppLayout>
    )
}

export default Daily
