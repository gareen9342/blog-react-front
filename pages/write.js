import React, { useEffect, useState, useCallback, useRef } from 'react'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import CenteredLayout from '../components/CenteredLayout'
import { Button, Input, Select } from 'antd'
import useInput from '../hooks/useInput'
import dynamic from 'next/dynamic'
import { myMenus } from '../config/menus'
import { UPLOAD_POST_REQUEST } from '../types/post'

import AddCategoryForm from '../components/AddCategoryForm'
const Editor = dynamic(import('../components/Editor'), { ssr: false })

const write = (props) => {
    const dispatch = useDispatch()
    // const { me } = useSelector((state) => state.user)

    // useEffect(() => {
    //     if (!me.id) {
    //         alert('글을 작성하려면 로그인이 필요합니다.')
    //         Router.push('/login')
    //     }
    //     console.log(me)
    // }, [me && me.id])

    /* select values */
    const { Option } = Select

    /*
    addCategory
    name_hidden: req.body.name_hidden, // number
      name_show: req.body.name_show,
    */

    /********* submit */
    const [subject, onChangesubject] = useInput('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('')
    const [hashTag, onChangeHashTag] = useInput('')

    const handleChange = useCallback((value) => {
        setCategory(value)
    }, [])

    const handleSubmit = useCallback(() => {
        if (!subject || !category || !content) {
            return alert(
                '필수 영역을 모두 작성해 주세요. (제목, 카테고리, 내용)'
            )
        }
        dispatch({
            type: UPLOAD_POST_REQUEST,
            data: { subject, category, content, hashtag: hashTag },
        })
    }, [content, category, subject, hashTag])

    return (
        <>
            <CenteredLayout>
                <AddCategoryForm />
                <Select placeholder="카테고리 선택" onChange={handleChange}>
                    {myMenus.slice(1).map((x) => (
                        <Option key={x.key} value={x.selectValue}>
                            {x.menuName}
                        </Option>
                    ))}
                </Select>
                <br />
                <Input
                    value={subject}
                    onChange={onChangesubject}
                    placeholder={'제목을 입력해 주세요'}
                />
                <br />
                <Editor content={content} setContent={setContent} />
                <Input
                    value={hashTag}
                    onChange={onChangeHashTag}
                    placeholder="해시태그를 #을 이용해 넣어주세요."
                />
                <br />
                <Button onClick={handleSubmit}>submit</Button>
            </CenteredLayout>
        </>
    )
}

/*
{postData.split(/(#[^\s]+)/g).map((v, idx) => {
        if (v.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={idx}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}


*/

write.propTypes = {}

export default write
