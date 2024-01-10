//css
import style from "./Home.module.css";

//hooks

import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

//components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={style.home}>
      <h1>Posts recentes</h1>
      <form
        onSubmit={handleSubmit}
        className={style.search_form}
      >
        <input
          placeholder="busque por tags"
          type="text"
          name=""
          id=""
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className={style.btn_dark}>Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => (
            <PostDetail
              key={post.id}
              post={post}
            />
          ))}

        {posts && posts.length == 0 && (
          <div className={style.noposts}>
            <h2>Que vazio...</h2>
            <p>Não foi encontrado nenhum POST :(</p>
            <Link
              className="btn"
              to="/posts/create"
            >
              Criar primeiro POST
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
