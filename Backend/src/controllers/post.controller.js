const ImageKit = require('@imagekit/nodejs')
const postModel = require('../models/post.model')
const likeModel = require('../models/like.edge.model')

const imageKit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY })

async function imageUpload(imageFile) {
    return uploadFile = await imageKit.files.upload({
        file: await ImageKit.toFile(Buffer.from(imageFile.buffer), 'file'),
        fileName: imageFile.originalname,
        folder: 'cohort-2-insta-clone-project'
    })

}

/*
POST /api/posts [protected]
*/

async function createPost(req, res) {
    const { caption } = req.body;

    const file = await imageUpload(req.file);

    const post = await postModel.create({
        caption: caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: 'Post successfully created',
        post
    })
}

/*
GET /api/posts [protected ]
*/
async function fetchAllPosts(req, res) {
    const { token } = req.cookies;

    // posts fetching logic

    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully...",
        posts
    })

}

/*
GET /api/posts/details/:postId
- returns a specific post with the id. Also checks  weather the post belongs to the user that is requesting the post.
*/

async function fetchPost(req, res) {
    const { token } = req.cookies;

    // method logic
    const userId = req.user.id;
    const { postId } = req.params;

    // try-catch block to avoide all sorts of mongodb errors which are not specifically handled.

    try {
        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: 'Unable to find the post with the provided post id'
            })
        }

        if (!(post.user.toString() === userId)) {
            return res.status(403).json({
                message: "You're not the creator of this post. Unable to fetch."
            })
        }

        res.status(200).json({
            message: "Post fetched successfully",
            post
        })
    } catch (error) {
        return res.status(404).json({
            message: 'Unable to fetch the specific post. Please try again later...'
        })
    }

}

/* 
* POST /api/posts/like/:postId
 */

async function likePost(req, res){
    const {username} = req.user;
    const {postId} = req.params;

    const post = postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    return res.status(200).json({
        message: 'Successfully liked the post',
        like
    })
}

module.exports = { createPost, fetchAllPosts, fetchPost, likePost } 