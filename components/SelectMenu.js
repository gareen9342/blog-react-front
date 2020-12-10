import React, { useCallback } from 'react'
import { Select } from 'antd'

function SelectMenu({ setCategory }) {
    const { Option } = Select
    const handleChange = useCallback((value) => {
        setCategory(value)
    }, [])
    return (
        <Select placeholder="카테고리 선택" onChange={handleChange}>
            <Option value={3}>사는 이야기</Option>
            <Option value={1}>CSS</Option>
            <Option value={4}>HTML</Option>
            <Option value={2}>JavaScript</Option>
            <Option value={5}>Java</Option>
            <Option value={6}>NodeJS</Option>
            <Option value={7}>React.js</Option>
            <Option value={8}>Spring</Option>
            <Option value={9}>DataBase</Option>
        </Select>
    )
}

export default SelectMenu
