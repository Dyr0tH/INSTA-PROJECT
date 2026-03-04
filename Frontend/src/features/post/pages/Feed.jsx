import React, { useEffect } from 'react'
import '../styles/Feed.scss'
import Post from '../components/Post'
import userPost from '../hook/userPost'

const Feed = () => {
    const { feed, handleGetFeed, loading } = userPost()



    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (
            <main>
                <h1>Feed is loading...</h1>
            </main>
        )
    }


    return (
        <main className='feed-page'>
            <div className="feed">

                <div className="posts">
                    {feed.map(post => {
                        return <Post user={post.user} post={post} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
