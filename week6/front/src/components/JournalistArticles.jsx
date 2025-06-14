import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJournalistArticles, getJournalistById } from "../services/api";
import "../index.css";

export default function JournalistArticles() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [journalist, setJournalist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJournalistData();
  }, [id]);

  const fetchJournalistData = async () => {
    try {
      setIsLoading(true);
      setError("");

      // First try to get the journalist
      const journalistData = await getJournalistById(id);
      if (!journalistData) {
        setError("Journalist not found");
        return;
      }
      setJournalist(journalistData);

      // Then get their articles
      const articlesData = await getJournalistArticles(id);
      setArticles(articlesData || []);
    } catch (err) {
      console.error("Error fetching journalist data:", err);
      setError(err.response?.data?.message || "Failed to fetch journalist data");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!journalist) return <div>Journalist not found</div>;

  return (
    <div>
      <header>        <h1>{journalist.name}</h1>
        <h2>{journalist.email}</h2>
        <h3>Bio: {journalist.bio}</h3>
      </header>

      <div className="article-list">
        {articles.length === 0 ? (
          <div>No articles found for this journalist.</div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className="article-title">{article.title}</div>
              <div className="article-snippet">
                {article.content.substring(0, 100)}
                {article.content.length > 100 ? "..." : ""}
              </div>
              <div className="article-actions">
                <Link
                  to={`/articles/${article.id}`}
                  className="button-secondary"
                >
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
