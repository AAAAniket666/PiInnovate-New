import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaEye, FaTags, FaArrowLeft } from 'react-icons/fa';
import api from '../../app/api';
import '../../assets/css/blog.css';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await api.get(`/blog/${slug}`);
        setPost(response.data);
        setLoading(false);
        
        // After getting the post, we could fetch related posts
        // based on category, but for now we'll skip that
      } catch (err) {
        console.error('Error fetching blog post:', err);
        if (err.response?.status === 404) {
          setError('Blog post not found.');
        } else {
          setError('Failed to load blog post. Please try again later.');
        }
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Loading blog post...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-4">
          <Button 
            as={Link} 
            to="/blog" 
            variant="primary"
          >
            <FaArrowLeft className="me-2" /> Back to Blog
          </Button>
        </div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="py-5 text-center">
        <p>Blog post not found.</p>
        <Button 
          as={Link} 
          to="/blog" 
          variant="primary" 
          className="mt-3"
        >
          <FaArrowLeft className="me-2" /> Back to Blog
        </Button>
      </Container>
    );
  }

  return (
    <section className="blog-post-section py-5">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Row>
            <Col lg={8}>
              <motion.div 
                className="blog-post-content-wrapper"
                variants={itemVariants}
              >
                <div className="blog-post-header">
                  {post.categories && post.categories.length > 0 && (
                    <div className="blog-categories mb-3">
                      {post.categories.map((category, i) => (
                        <Link 
                          key={i} 
                          to={`/blog?category=${category}`}
                          className="blog-category-badge"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  <h1 className="blog-post-title">{post.title}</h1>
                  
                  <div className="blog-post-meta">
                    <div className="blog-meta-item">
                      <FaCalendarAlt className="meta-icon" />
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    
                    {post.author && (
                      <div className="blog-meta-item">
                        <FaUser className="meta-icon" />
                        <span>{post.author}</span>
                      </div>
                    )}
                    
                    <div className="blog-meta-item">
                      <FaEye className="meta-icon" />
                      <span>{post.viewCount || 0} views</span>
                    </div>
                  </div>
                </div>
                
                {post.featuredImage && (
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="blog-post-image img-fluid"
                  />
                )}
                
                <div className="blog-post-content">
                  {post.content ? (
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  ) : (
                    <p>
                      This is a placeholder for the blog post content. In a real application,
                      this would be the full content of the blog post, formatted with HTML.
                    </p>
                  )}
                </div>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="blog-post-tags">
                    <FaTags className="me-2" />
                    {post.tags.map((tag, i) => (
                      <Link 
                        key={i} 
                        to={`/blog?tag=${tag}`}
                        className="blog-post-tag"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
                
                <div className="blog-post-navigation d-flex justify-content-between mt-5 pt-4 border-top">
                  <Button 
                    as={Link} 
                    to="/blog" 
                    variant="outline-primary"
                  >
                    <FaArrowLeft className="me-2" /> Back to Blog
                  </Button>
                </div>
              </motion.div>
            </Col>
            
            <Col lg={4}>
              <div className="blog-sidebar">
                <motion.div 
                  className="blog-sidebar-widget mb-4"
                  variants={itemVariants}
                >
                  <h4 className="sidebar-title">Recent Posts</h4>
                  <ul className="recent-posts-list">
                    <li>
                      <Link to="/blog/example-post">
                        <div className="recent-post-image">
                          <img src="/images/default-blog.jpg" alt="Blog Post" />
                        </div>
                        <div className="recent-post-info">
                          <h5>Example Blog Post Title</h5>
                          <span>May 10, 2025</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/blog/example-post-2">
                        <div className="recent-post-image">
                          <img src="/images/default-blog.jpg" alt="Blog Post" />
                        </div>
                        <div className="recent-post-info">
                          <h5>Another Example Blog Post</h5>
                          <span>May 5, 2025</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="blog-sidebar-widget mb-4"
                  variants={itemVariants}
                >
                  <h4 className="sidebar-title">Categories</h4>
                  <ul className="category-list">
                    <li><Link to="/blog">All Categories</Link></li>
                    <li><Link to="/blog?category=Technology">Technology</Link></li>
                    <li><Link to="/blog?category=Innovation">Innovation</Link></li>
                    <li><Link to="/blog?category=Business">Business</Link></li>
                    <li><Link to="/blog?category=Development">Development</Link></li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="blog-sidebar-widget"
                  variants={itemVariants}
                >
                  <h4 className="sidebar-title">Tags</h4>
                  <div className="tag-cloud">
                    <Link to="/blog?tag=technology" className="tag-item">Technology</Link>
                    <Link to="/blog?tag=innovation" className="tag-item">Innovation</Link>
                    <Link to="/blog?tag=design" className="tag-item">Design</Link>
                    <Link to="/blog?tag=development" className="tag-item">Development</Link>
                    <Link to="/blog?tag=business" className="tag-item">Business</Link>
                  </div>
                </motion.div>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default BlogPostPage;
