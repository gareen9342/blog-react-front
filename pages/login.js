import React from 'react'
import PropTypes from 'prop-types'
import CenteredLayout from '../components/CenteredLayout'
import Form from 'antd/lib/form/Form'
import styled from 'styled-components'
const InputWrap = styled.div`
    padding: 25px 0;
    > label {
        display: block;
        padding-bottom: 10px;
    }
`
const login = (props) => {
    return (
        <CenteredLayout>
            <Form>
                <InputWrap></InputWrap>
            </Form>
        </CenteredLayout>
    )
}

login.propTypes = {}

export default login
