import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticleById } from "../services/api";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getArticleById(id);
      setArticle(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch article");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="article-page">
      <article>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="category">{article.category}</span>
        </div>
        <div className="content">{article.content}</div>
      </article>

      <Link to="/" className="back-button">
        Back to Articles
      </Link>
    </div>
  );
}
