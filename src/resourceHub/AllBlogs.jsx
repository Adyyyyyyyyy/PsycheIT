import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './blogPage.css';
import NavBar from '../Navbar';
import blogData from '../resourceHub/resources.json';

const AllBlogs = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const renderContent = () => {
    return blog.content.map((item, index) => {
      switch (item.type) {
        case 'heading':
          return <h3 key={index} className="blog-heading">{item.text}</h3>;
        case 'paragraph':
          return <p key={index} className="blog-paragraph">{item.text}</p>;
        case 'list':
          return (
            <ul key={index} className="blog-list">
              {item.items.map((listItem, idx) => (
                <li key={idx}>{listItem}</li>
              ))}
            </ul>
          );
        default:
          return null;
      }
    });
  };

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
            <div className="blog-author-date">
              <span className="blog-author">By {blog.author}</span>
              <span className="blog-date">
                {new Date(blog.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </header>

          {blog.image && (
            <div className="blog-image-container">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="blog-image"
              />
            </div>
          )}

          <div className="blog-content">
            {renderContent()}
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

export default AllBlogs;