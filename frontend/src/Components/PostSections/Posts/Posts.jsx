import React from 'react'
import PostCard from './PostCard'
import PostData from './../../../Resources/PostDemoData';


export default function Posts() {
  const posts = PostData;  //here we can make call to api and
  console.log(posts)
  return (
    <div>
     {posts.map((post, index) => (
      <PostCard key={index} Post={post} />
     ))}
    </div>
  )
}
