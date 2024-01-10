import style from "./Post.module.css";
import { usePost } from "../../hooks/usePost";
import { Link } from "react-router-dom";

//Hooks
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  const { document: post, loading } = usePost("posts", id);

  return (
    <div className={style.post_container}>
      {loading && <p>Carregando...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img
            src={post.image}
            alt={post.title}
          />
          <p>{post.body}</p>
          <h3>Esse post é sobre:</h3>
          <div className={style.tags}>
            {post.tagArrays.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>

              
            ))}

            
          </div>

          <Link to='/' className={style.btn}>Voltar</Link>
        </>
      )}
    </div>
  );
};

export default Post;
