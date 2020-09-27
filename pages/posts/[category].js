import React from 'react'
import PropTypes from 'prop-types'
import AppLayout from '../../components/AppLayout'
import { useRouter } from 'next/router'
const Posts = () => {
    const router = useRouter()
    const { category } = router.query
    return (
        <AppLayout>
            posts
            {category}
        </AppLayout>
    )
}

Posts.propTypes = {}

export default Posts
