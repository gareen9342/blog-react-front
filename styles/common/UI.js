import styled from 'styled-components'
export const CenterContainer = styled.div`
    width: 1020px;
    margin: 0 auto;
    padding: 50px 0;
    @media screen and (max-width: 1020px) {
        width: 90%;
    }
`

export const Title = styled.h2`
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
    font-size: 2em;
    font-weight: 200;
`
export const SubTitle = styled.p`
    padding: 20px 0 0;
    font-size: 1em;
    text-align: ${(props) => (props.textAlign ? props.textAlign : 'left')};
    font-weight: 200;
`
