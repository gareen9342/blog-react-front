import { useState, useRef, useCallback } from 'react'
import { DownOutlined, LeftOutlined, UserOutlined } from '@ant-design/icons'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { DropdownOverlay, DropdownWrap, DropdownTrigger } from './style'
function Dropdown({ overlay }) {
    const ref = useRef()
    const [isModalOpen, setModalOpen] = useState(false)

    useOnClickOutside(ref, () => setModalOpen(false))

    const onClickTrigger = useCallback(() => {
        setModalOpen(!isModalOpen)
    }, [isModalOpen])
    // Call hook passing in the ref and a function to call on outside click

    return (
        <DropdownWrap ref={ref}>
            {isModalOpen && <DropdownOverlay>{overlay}</DropdownOverlay>}
            <DropdownTrigger onClick={onClickTrigger}>
                <UserOutlined />
            </DropdownTrigger>
        </DropdownWrap>
    )
}

export default Dropdown
