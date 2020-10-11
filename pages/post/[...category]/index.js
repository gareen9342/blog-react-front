import React, { useEffect } from 'react'
import AppLayout from '../../../components/AppLayout'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { LOAD_POSTLIST_REQUEST } from '../../../types/post'
import wrapper from '../../../store/configureStore'
import { END } from 'redux-saga'
import axios from 'axios'
import Link from 'next/link'
const Posts = () => {
    const router = useRouter()
    const { category } = router.query
    // const dispatch = useDispatch()
    const { categoryPostList, singlePost } = useSelector((state) => state.post)
    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_POSTLIST_REQUEST,
    //         data: category,
    //     })
    // }, [])
    console.log('category=', category)
    return (
        <AppLayout>
            {categoryPostList.length > 0 &&
                categoryPostList.map((item) => (
                    <p key={item.id}>{item.subject}</p>
                ))}
            {console.log('this is only category')}
            <Link href="/post/[...category]" as={'/post/1/ddd'}>
                <a>testest</a>
            </Link>
        </AppLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    async (context) => {
        const cookie = context.req ? context.req.headers.cookie : ''

        axios.defaults.headers.Cookie = ''

        if (context.req && cookie) {
            axios.defaults.headers.Cookie = cookie
        }
        // console.log('context=', context)
        context.store.dispatch({
            type: LOAD_POSTLIST_REQUEST,
            data: context.params.category[0],
        })

        /*
        
         여기다 데이터 페칭
        
        */
        // if (context.params.category.length > 1) {
        //     context.store.dispatch({
        //         type: LOAD_POSTLIST_REQUEST,
        //         data: context.params.category[0],
        //     })
        // }
        context.store.dispatch(END)
        await context.store.sagaTask.toPromise()
    }
)

export default Posts
