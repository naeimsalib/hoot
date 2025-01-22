import { useState } from "react";
import { useNavigate } from "react-router";
import * as hootService from "../../services/hootService"; // ✅ Change from postService to hootService

export default function NewPostPage() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const hoot = await hootService.create({ text: content }); // ✅ Ensure correct payload
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>New Post</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Post Content</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <button type="submit">ADD POST</button>
      </form>
    </>
  );
}
