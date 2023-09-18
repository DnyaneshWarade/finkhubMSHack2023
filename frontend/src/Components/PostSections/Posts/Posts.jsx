import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import PostData from "./../../../Resources/PostDummyData";
import { getPosts } from "../../../Services/postFunctions";

export default function Posts() {
  const [posts, setPosts] = useState(); //here we can make call to api and
  const fetchPosts = async () => {
    try {
      var result = await getPosts();
      if (result.code === 200 && result.res) {
        //sort with date
        const resultPosts = result.res;
        resultPosts.sort((a, b) =>{
          return b.timeStamp - a.timeStamp;
        })
        setPosts(
          result.res.filter((post) => {
            if (post["description"] !== undefined) {
              return post;
            }
          })
        );
      }
    } catch (error) {
      console.log("error", error);

      // setPosts(PostData.filter((post)=>{
      //   if (post["description"] !== undefined){
      //     return post;
      //   }
      // } ))
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
