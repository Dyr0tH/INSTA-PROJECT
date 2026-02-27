const express = require('express')
const userController = require('../controllers/user.controller')
const identifyUser = require('../middleware/auth.middleware')

const userRouter = express.Router();

/* 
 POST /api/users/follow/:userId
 Follow a user
 private access
 */
userRouter.post('/follow/:userId',identifyUser, userController.followUser)

/* POST /api/users/unfollow/:userId
*  Description - allows a user to unfollow a user
 */
userRouter.post('/unfollow/:userId', identifyUser, userController.unFollowUser)

// GET /api/users/followers
// Returns a list of user's followers
userRouter.get('/followers', identifyUser, userController.listFollowers)

// GET /api/users/following
// Returns a list of of accounts the user is following
userRouter.get('/following', identifyUser, userController.listFollowing)

// PATCH /api/users/follow/accept
// sets the follow request status to 'accepted'
userRouter.patch('/follow/accept/:followId', identifyUser, userController.acceptFollowRequest)

// PATCH /api/users/follow/reject
// sets the follow request status to 'reject

module.exports = userRouter;