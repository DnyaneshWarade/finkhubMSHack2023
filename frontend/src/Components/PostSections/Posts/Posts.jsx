import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
// import PostData from "./../../../Resources/PostDemoData";
import PostData from "./../../../Resources/PostDummyData";
import { getPosts } from "../../../Services/postFunctions";

export default function Posts() {
  const [posts, setPosts] = useState(); //here we can make call to api and
  const fetchPosts = async () => {
    try {
      // console.log("here")

      var result = await getPosts();
      // console.log("result", result)
      if (result.code === 200 && result.res) {
        // console.log(result.res)
        setPosts(result.res.filter((post)=>{
          if (post["description"] !== undefined){
            return post;
          }
        } ));
      }else{
        // console.log("else")
      }
    } catch (error) {
      console.log("error", error)

      setPosts(PostData.filter((post)=>{
        if (post["description"] !== undefined){
          return post;
        }
      } ))
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      {posts &&
        posts.map((post, index) => <PostCard key={index} Post={post} />)}
    </div>
  );
}
