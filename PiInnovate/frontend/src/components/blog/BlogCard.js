import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaComments } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../assets/css/blog.css';

const BlogCard = ({ post, index }) => {
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      className="blog-card-item"
    >
      <Card className="blog-card h-100">
        <Link to={`/blog/${post.slug}`} className="blog-image-link">
          <motion.div
            className="blog-image-wrapper"
            variants={imageVariants}
          >
            <Card.Img 
              variant="top" 
              src={post.featuredImage || '/images/default-blog.jpg'} 
              alt={post.title}
              className="blog-image" 
            />
          </motion.div>
        </Link>
        
        <Card.Body>
          {post.categories && post.categories.length > 0 && (
            <div className="blog-categories mb-2">
              {post.categories.map((category, i) => (
                <Link 
                  key={i} 
                  to={`/blog/category/${category}`}
                  className="blog-category-badge"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
          
          <Card.Title className="blog-title mb-3">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </Card.Title>
          
          {post.excerpt && (
            <Card.Text className="blog-excerpt">
              {post.excerpt}
            </Card.Text>
          )}
          
          <div className="blog-meta mt-3">
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
              <FaComments className="meta-icon" />
              <span>{post.viewCount || 0} views</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
