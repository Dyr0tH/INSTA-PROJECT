const express = require('express');
const postRouter = express.Router()
const postController = require('../controllers/post.controller')
const multer = require('multer')
const identifyUser = require('../middleware/auth.middleware')

const upload = multer({ storage: multer.memoryStorage() })


postRouter.post('/' ,upload.single('image'),identifyUser , postController.createPost)
postRouter.get('/',identifyUser, postController.fetchAllPosts)
postRouter.get('/details/:postId',identifyUser, postController.fetchPost)

/*
* POST /api/posts/like/:postId
* like a post when an Id is provided.
*/

postRouter.post('/like/:postId', identifyUser, postController.likePost)


/* 
* GET /api/posts/feed
* get all the posts created in the DB
 */

postRouter.get('/feed', identifyUser, postController.getFeed)

module.exports = postRouter;