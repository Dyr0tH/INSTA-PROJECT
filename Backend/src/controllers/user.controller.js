const followModel = require('../models/follow.edge.model');
const userModel = require('../models/user.model');

async function followUser(req, res) {
    const userId = req.user.id;
    const followeeId = req.params.userId;

    const isFolloweeExists = await userModel.findOne({
        _id: followeeId
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "Requested user does not exists."
        })
    }

    if (userId === followeeId) {
        return res.status(400).json({
            message: "Following yourself is not allowed!!!"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: userId,
        following: followeeId
    })

    if (isAlreadyFollowing) {
        return res.status(200).json({
            message: "You're already following this user",
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: userId,
        following: followeeId
    })

    return res.status(200).json({
        message: "You've successfully followed the user",
        followRecord
    })
}

async function unFollowUser(req, res) {
    const userId = req.user.id;
    const unFolloweeid = req.params.userId;

    const isUnFolloweeExists = await userModel.findOne({
        _id: unFolloweeid
    })

    if (!isUnFolloweeExists) {
        return res.status(404).json({
            message: "User requested to unfollow a user that does not exists."
        })
    }

    if (userId === unFolloweeid) {
        return res.status(400).json({
            message: "you cannot follow or unfollow yourself"
        })
    }

    const followRecord = await followModel.findOne({
        follower: userId,
        following: unFolloweeid
    })

    if (!followRecord) {
        return res.status(200).json({
            message: "You do not follow the user."
        })
    }

    await followModel.findByIdAndDelete(followRecord._id)

    res.status(200).json({
        message: "You've successsfully unfollowed the user"
    })
}

async function listFollowers(req, res) {
    const userId = req.user.id;

    const userFollowers = await followModel.find({ following: userId });

    res.status(200).json({
        message: "List of your followers",
        userFollowers
    })

}

async function listFollowing(req, res) {
    const userId = req.user.id;

    const userFollowing = await followModel.find({
        follower: userId
    })

    res.status(200).json({
        message: "These are the users you follow",
        userFollowing
    })
}

async function acceptFollowRequest(req, res) {
    const userId = req.user.id;
    const { followId } = req.params;

    let followRecord = await followModel.findById(followId);

    if (!followRecord) {
        return res.status(400).json({
            message: "Follow with the provided Id doesn't exists..."
        })
    }

    if (followRecord.follower.toString() === userId) {
        return res.status(400).json({
            message: "You cannot accept your own follow request"
        })
    }

    if (followRecord.following.toString() !== userId) {
        return res.status(400).json({
            message: "This follow request does not belong to you. You cannot accept other users' follow requst list."
        })
    }

    if (followRecord.status === 'accepted') {
        return res.status(200).json({
            message: "You already follow this user"
        })
    }

    if (followRecord.status === 'rejected') {
        return res.status(400).json({
            message: "You cannot accept a previously rejected request..."
        })
    }

    if (followRecord.status === 'pending') {
        const newFollowRecord = await followModel.findByIdAndUpdate(followId, {
            status: 'accepted'
        })
        return res.status(200).json({
            message: "Successfully accepted to follow request",
            newFollowRecord
        })
    }
}

async function rejectFollowRequest(req, res) {
    const userId = req.user.id;
    const { followId } = req.params;

    let followRecord = await followModel.findById(followId);

    if (!followRecord) {
        return res.status(400).json({
            message: "Follow with the provided Id doesn't exists..."
        })
    }

    if (followRecord.follower.toString === userId) {
        return res.status(400).json({
            message: "You cannot reject your own follow request"
        })
    }

    if (followRecord.following.toString() !== userId) {
        return res.status(400).json({
            message: "This follow request does not belong to you. You cannot reject other users' follow requst list."
        })
    }

    if (followRecord.status === 'accepted') {
        return res.status(200).json({
            message: "You have accepted the follow request of this user previously."
        })
    }

    if (followRecord.status === 'rejected') {
        return res.status(400).json({
            message: "You cannot reject a previously rejected request..."
        })
    }

    if (followRecord.status === 'pending') {
        const newFollowRecord = await followModel.findByIdAndUpdate(followId, {
            status: 'rejected'
        })
        return res.status(200).json({
            message: "Successfully reject to follow request",
            newFollowRecord
        })
    }
}

module.exports = { followUser, unFollowUser, listFollowers, listFollowing, acceptFollowRequest, rejectFollowRequest }