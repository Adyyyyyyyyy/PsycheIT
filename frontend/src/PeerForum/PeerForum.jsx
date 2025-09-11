import React, { useState, useEffect } from 'react';
import './PeerForum.css';
import NavBar from '../Navbar';
// Import the JSON data
import forumData from './PeerForum.json';

const PeerForum = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from JSON file
  useEffect(() => {
    setPosts(forumData.posts);
    setCategories(forumData.categories);
    setLoading(false);
  }, []);

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeTab);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    
    // Create a new post object
    const newPostObj = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: 'anonymous', // You might want to replace this with actual user data
      timestamp: 'Just now',
      replies: 0,
      likes: 0,
      category: 'general', // Default category, you might want to add category selection
      tags: [] // You might want to add tag functionality
    };
    
    // Add the new post to the posts array
    setPosts([newPostObj, ...posts]);
    
    // Reset form
    setNewPost({ title: '', content: '' });
    setShowNewPostForm(false);
    
    alert('Your post has been submitted!');
  };

  if (loading) {
    return <div className="loading">Loading forum...</div>;
  }

  return (
    <div className="peers">
    <NavBar/>
    <div className="peer-forum">
      <div className="forum-header">
        <h2>Peer Support Forum</h2>
        <p>Connect with other students who understand what you're going through</p>
        <button 
          className="new-post-btn"
          onClick={() => setShowNewPostForm(!showNewPostForm)}
        >
          <i className="fas fa-plus"></i>
          New Post
        </button>
      </div>

      {showNewPostForm && (
        <div className="new-post-form">
          <h3>Create a New Post</h3>
          <form onSubmit={handlePostSubmit}>
            <div className="form-group">
              <label htmlFor="post-title">Title</label>
              <input
                type="text"
                id="post-title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="What would you like to talk about?"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="post-content">Content</label>
              <textarea
                id="post-content"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Share your thoughts, questions, or experiences..."
                rows="4"
                required
              ></textarea>
            </div>
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowNewPostForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">Post to Forum</button>
            </div>
          </form>
        </div>
      )}

      <div className="forum-content">
        <div className="forum-sidebar">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map(category => (
              <li 
                key={category.id} 
                className={activeTab === category.id ? 'active' : ''}
                onClick={() => setActiveTab(category.id)}
              >
                {category.name}
              </li>
            ))}
          </ul>

          <div className="forum-guidelines">
            <h3>Community Guidelines</h3>
            <ul>
              <li><i className="fas fa-heart"></i> Be kind and supportive</li>
              <li><i className="fas fa-shield-alt"></i> Respect privacy</li>
              <li><i className="fas fa-comment"></i> Share experiences, not advice</li>
              <li><i className="fas fa-flag"></i> Report concerning content</li>
            </ul>
          </div>
        </div>

        <div className="forum-posts">
          <div className="posts-filter">
            <span>{filteredPosts.length} posts</span>
            <div className="sort-options">
              <select>
                <option>Newest first</option>
                <option>Most replies</option>
                <option>Most liked</option>
              </select>
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="no-posts">
              <i className="fas fa-comments"></i>
              <p>No posts found in this category</p>
            </div>
          ) : (
            <div className="posts-list">
              {filteredPosts.map(post => (
                <div key={post.id} className="forum-post">
                  <div className="post-header">
                    <div className="author-avatar">
                      {post.author.charAt(0)}
                    </div>
                    <div className="post-meta">
                      <h3 className="post-title">{post.title}</h3>
                      <div className="author-info">
                        <span className="author-name">{post.author}</span>
                        <span className="post-time">{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>
                  
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  
                  <div className="post-actions">
                    <button className="action-btn">
                      <i className="fas fa-heart"></i>
                      <span>{post.likes}</span>
                    </button>
                    <button className="action-btn">
                      <i className="fas fa-comment"></i>
                      <span>{post.replies} replies</span>
                    </button>
                    <button className="action-btn">
                      <i className="fas fa-share"></i>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default PeerForum;