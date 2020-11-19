import styled from 'styled-components'
import { Button } from 'antd'
import { BORDER } from '../../styles/common/Theme'
export const DropdownWrap = styled.div`
    position: relative;
`

export const DropdownTrigger = styled(Button)``

export const DropdownOverlay = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    width: 90px;
    border: ${BORDER};
    border-bottom: none;
    .ant-btn {
        padding: 0;
        padding-right: 15px;
        text-align: right;
        font-size: 1em;
    }
`

export const DropdownOverlayLink = styled.a`
    display: block;
    height: 45px;
    text-align: right;
    background-color: #fff;
    border-bottom: ${BORDER};
    > span {
        white-space: nowrap;
        display: inline-block;
        max-width: 90%;

        padding-right: 15px;
        overflow: hidden;
        line-height: 45px;
    }
`

export const LogoutBtn = styled(Button)`
    padding: 0;
    border: none;
    width: 100%;
    height: 45px;
`
