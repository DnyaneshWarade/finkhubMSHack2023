import React from 'react'
import PostMenu from './PostMenus/PostMenu'
import './PostSection.css'
import Posts from './Posts/Posts'
export default function PostSection() {
  return (
    <div className='PostSection'>
        <PostMenu/>
        <Posts/>
    </div>
  )
}
