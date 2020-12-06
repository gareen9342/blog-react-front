import { Button, Input } from 'antd'
import React, { useCallback, useMemo } from 'react'
import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { ADD_CATEGORY_REQUEST } from '../types/post'

function AddCategoryForm() {
    const [hiddenName, onChangeHiddenName] = useInput('')
    const [showName, onChangeShowName] = useInput('')
    const dispatch = useDispatch()

    const handleSubmit = useCallback(() => {
        dispatch({
            type: ADD_CATEGORY_REQUEST,
            data: {
                name_hidden: hiddenName,
                name_show: showName,
            },
        })
    }, [hiddenName, showName])

    const categoryFormStyle = useMemo(
        () => ({
            display: 'flex',
        }),
        []
    )
    return (
        <div style={categoryFormStyle}>
            <Input
                placeholder="숫자 형태의 유니크한 이름이 필요합니다."
                value={hiddenName}
                onChange={onChangeHiddenName}
            />
            <Input
                placeholder="메뉴바에서 보여질 카테고리의 이름"
                value={showName}
                onChange={onChangeShowName}
            />
            <Button htmlType="submit" onClick={handleSubmit}>
                등록
            </Button>
        </div>
    )
}

export default AddCategoryForm
