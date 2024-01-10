import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

//hooks

import { useAuth } from "../../hooks/useAuth";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { auth } = useAuth();
  const uid = auth.currentUser.uid;

  //posts do user
  const { documents: post, loading } = useFetchDocuments("posts", null, uid);


  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Meus posts</h2>
      <p>Gerencie os seus posts</p>
      {post && post.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrado posts!</p>
          <Link
            className={styles.btn}
            to="/posts/create"
          >
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {post &&
            post.map((post) => (
              <div
                key={post.id}
                className={styles.post_row}
              >
                <p>{post.title}</p>
                <div>
                  <Link
                    to={`/posts/${post.id}`}
                    className="btn btn-outline"
                  >
                    Ver
                  </Link>

                  <Link
                    className="btn btn-outline"
                    to={`posts/edit/${post.id}`}
                  >
                    Editar
                  </Link>

                  <button
                    className="btn btn-outline btn-danger"
                    onClick={() => {
                      if(window.confirm('Deseja deletar esse post?')){
                        deleteDocument(post.id)
                      }
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
