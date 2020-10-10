import React, { useEffect } from 'react'
import AppLayout from '../../components/AppLayout'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { myMenus } from '../../config/menus'
import { LOAD_POSTLIST_REQUEST } from '../../types/post'
const Posts = () => {
    const router = useRouter()
    const { category } = router.query
    const dispatch = useDispatch()
    const { categoryPostList, singlePost } = useSelector((state) => state.post)
    useEffect(() => {
        dispatch({
            type: LOAD_POSTLIST_REQUEST,
            data: category,
        })
    }, [])
    return (
        <AppLayout>
            posts
            {category}
        </AppLayout>
    )
}

Posts.propTypes = {}

export default Posts
