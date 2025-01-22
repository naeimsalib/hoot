export default function PostItem({ post }) {
    return (
      <article>
        <h3>{post.title}</h3>
        <h4>{new Date(post.createdAt).toLocaleDateString()}</h4>
        <p>{post.text}</p>
        <h4>🕺 {post.author.name}</h4>
        
        <h5>Comments:</h5>
        <ul>
          {post.comments.map((comment) => (
            <li key={comment._id}>
              {comment.text} - <strong>{comment.author.name}</strong>
            </li>
          ))}
        </ul>
      </article>
    );
  }
  