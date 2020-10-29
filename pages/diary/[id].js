import React, { useEffect } from 'react'
import moment from 'moment'
import wrapper from '../../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
import AppLayout from '../../components/AppLayout'
import { CenterContainer, Title, SubTitle } from '../../styles/common/UI'
import { LOAD_SINGLE_DIARY_REQUEST } from '../../types/diary'
import { LOAD_ME_REQUEST } from '../../types/user'
import styled from 'styled-components'
import ImgSlider from '../../components/ImgSlider'
import { useSelector } from 'react-redux'
import { Row, Col } from 'antd'

const ImgFrame = styled.div`
    @media screen and (max-width: 768px) {
        max-height: 90vh;
        overflow: hidden;
    }
`

const TxtFrame = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 768px) {
        min-height: 40vh;
    }
`

const Txt = styled.p`
    max-width: 80%;
    text-align: center;
`
moment.locale('ko')
function SingleDiary() {
    const { singleDiary, loadSingleDiaryError } = useSelector(
        (state) => state.diary
    )
    useEffect(() => {
        if (loadSingleDiaryError) {
            alert(loadSingleDiaryError)
        }
        return () => {}
    }, [loadSingleDiaryError])
    return (
        <AppLayout>
            <CenterContainer>
                <Title>
                    {moment(singleDiary.createdAt).format('YYYY.MM.DD')} 의 기록
                </Title>
                <SubTitle>가볍게 기록하는 일상입니다.</SubTitle>
                <br />
                <br />
                <br />
                <br />
                <Row gutter={0}>
                    <Col xs={24} md={12} lg={12}>
                        <ImgFrame>
                            {singleDiary.Images && (
                                <ImgSlider images={singleDiary.Images} />
                            )}
                        </ImgFrame>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <TxtFrame>
                            <Txt>{singleDiary.content}</Txt>
                        </TxtFrame>
                    </Col>
                </Row>
            </CenterContainer>
        </AppLayout>
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
            type: LOAD_SINGLE_DIARY_REQUEST,
            data: context.params.id,
        })
        context.store.dispatch({
            type: LOAD_ME_REQUEST,
        })
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default SingleDiary
