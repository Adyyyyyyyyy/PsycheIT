import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './blogPage.css';
import NavBar from '../Navbar';
import blogData from './resources.json'; 

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the blog with the matching ID
    const foundBlog = blogData.blogs.find(blog => blog.id === parseInt(id));
    setBlog(foundBlog);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="blog-loading">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="blog-not-found">
        <NavBar />
        <div className="container">
          <h1>Blog Not Found</h1>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/resources" className="back-link">← Back to Resources</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <NavBar />
      
      <div className="blog-container">
        <Link to="/resources" className="back-link">← Back to Resources</Link>
        
        <article className="blog-article">
          <header className="blog-header">
            <div className="blog-meta">
              <span className="blog-category">{blog.category}</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-excerpt">
              <p>{blog.excerpt}</p>
            </div>
          </header>

          <div className="blog-content">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          <footer className="blog-footer">
            <div className="blog-tags">
              <span>Tags: </span>
              <span className="blog-tag">#{blog.category}</span>
              <span className="blog-tag">#MentalHealth</span>
              <span className="blog-tag">#StudentLife</span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogPage;