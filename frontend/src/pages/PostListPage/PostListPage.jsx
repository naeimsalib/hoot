import { useState, useEffect } from "react";
import * as hootService from "../../services/hootService"; // ✅ Change from postService to hootService
import "./PostListPage.css";
import PostItem from "../../components/PostItem/PostItem";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await hootService.index(); // ✅ Change to hootService.index()
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  const postItems = posts.map((p) => <PostItem key={p._id} post={p} />);

  return (
    <>
      <h1>Post List</h1>
      <section className="post-item-container">{postItems}</section>
    </>
  );
}
