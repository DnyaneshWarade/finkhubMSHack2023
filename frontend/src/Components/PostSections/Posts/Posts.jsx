import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { getPosts } from "../../../Services/postFunctions";

export default function Posts() {
  const [posts, setPosts] = useState(); //here we can make call to api and
  const fetchPosts = async () => {
    try {
      var result = await getPosts();
      if (result.code === 200 && result.res) {
        setPosts(
          result.res.filter((post) => {
            //filter results only which has description in list
            if (post["description"] !== undefined) {
              return post;
            }
          })
        );
      }
    } catch (error) {
      
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
