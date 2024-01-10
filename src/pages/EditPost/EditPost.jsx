import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = usePost("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");
  const { auth } = useAuth();

  

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagArrays.join(", ");
      setTag(textTags);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //validar url img
    try {
      new URL(image);
    } catch (error) {
      return setFormError("a imagem precisa ser uma URL.");
    }

    //criar o array tags

    const tagArrays = tag.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os valores

    if (!title || !image || !tag || !body) {
      setFormError("Preencha todos os campos.");
    }

    if (formError) {
      return;
    }

    const data = {
      title,
      image,
      body,
      tagArrays,
      uid: auth.currentUser.uid,
      createdBy: auth.currentUser.displayName,
    }

   updateDocument(id, data)
    //redirect pra homepage
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      <h2>Editar Post</h2>
      <p>editar sua publicação</p>
      <>
        {post && <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="title"
              id=""
              required
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>

          <label>
            <span>Imagem:</span>
            <input
              type="text"
              name="image"
              id=""
              required
              placeholder="Insira uma imagem pro seu Post"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>

          <p className={styles.preview_title}>Preview da Imagem:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title}/>

          <label>
            <span>Descrição:</span>
            <textarea
              type="textarea"
              name="body"
              id=""
              required
              placeholder="Insira uma descrição"
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              id=""
              required
              placeholder="Insira as tags separadas por vírgulas"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
          </label>

          {!response.loading && (
            <input
              className="btn"
              type="submit"
              value="editar"
            />
          )}

          {response.loading && (
            <button
              className="btn"
              disabled
            >
              Aguarde...
            </button>
          )}

          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </form>}
      </>
    </div>
  );
};

export default EditPost;
