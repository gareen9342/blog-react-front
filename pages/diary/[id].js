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
const ContentWrap = styled.div`
    display: flex;
    justfy-content: space-between;
`

const ImgFrame = styled.div`
    width: 50%;
`

const TxtFrame = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
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
                <ContentWrap>
                    <ImgFrame>
                        {singleDiary.Images && (
                            <ImgSlider images={singleDiary.Images} />
                        )}
                    </ImgFrame>
                    <TxtFrame>
                        <Txt>{singleDiary.content}</Txt>
                    </TxtFrame>
                </ContentWrap>
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
