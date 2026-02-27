**Features to implement**

1. Authentication
   1. [X] Register
   2. [X] login
   3. [ ] logout (token blacklisting)
   4. [ ] OTP based registration (advance feature)
2. Post
   1. [X] Create post
   2. [ ] can see the feed
   3. [ ] like posts
   4. [ ] save post
3. User
   1. [X] Follow other user
   2. [X] Unfollow other user
   3. [X] can see who's following them
   4. [X] can see who they follow

---

**Schemas**

1. User Schema

   1. username: string, unique
   2. email: string, unique
   3. password: string, hashed
   4. bio: string, optional
   5. followers: array
   6. profile_image: string, optional, has a default value
2. Post Schema

   1. Caption: string
   2. image_url: string
   3. user: userId
   4. createdAt: date-time
