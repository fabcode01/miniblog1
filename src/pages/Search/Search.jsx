import style from "./Search.module.css";
import { Link } from "react-router-dom";

//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

//components
import PostDetail from "../../components/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);
  return (
    <div className={style.search_container}>
      <h1>Publicações com a tag '{search}'</h1>
      <div>
        {posts && posts.length === 0 && (
          <div className={style.no_posts}>
            <p>Não foram encontrados posts com essa tag</p>
            <Link className={style.back} to='/'>Voltar</Link>
          </div>
        )}

        {posts &&
          posts.map((post) => (
            <PostDetail
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </div>
  );
};

export default Search;
