import React, { useContext } from 'react'
import { getFeed } from '../services/post.api'
import { PostContext } from '../post.context'



const userPost = () => {

    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    return ({ loading, feed, post, handleGetFeed })
}

export default userPost
