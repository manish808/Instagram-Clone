import { Avatar } from '@mui/material'
import React from 'react'
import './Post.css'

function Post({username, caption,imageUrl}) {
    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                className="post_Avatar"
                src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="username"
                />
            <h4>{username}</h4>
            </div>
            <img className="Post_image"
            src={imageUrl}
            alt=""
            />
            <p><strong>{username}</strong>{caption}</p>
        </div>
    )
}

export default Post
