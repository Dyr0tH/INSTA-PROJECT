# the JWT token has the following structure:

{

    id: user._id (from mongoDB),

    email: user.email (from mongoDB)

}

this token is used in the auth.middleware to identify if the user is authenticated properly or not. and the entire token is injected in the requst before passing to next().

to use the token: `req.user.<field_name>`
