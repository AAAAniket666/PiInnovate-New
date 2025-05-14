import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import Hero from '../ui/Hero';
import BlogCard from './BlogCard';
import api from '../../app/api';
import '../../assets/css/blog.css';

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const pageParam = searchParams.get('page') || 1;
        const categoryParam = searchParams.get('category') || '';
        
        let url = `/blog?pageNumber=${pageParam}`;
        if (categoryParam) {
          url = `/blog/category/${categoryParam}?pageNumber=${pageParam}`;
        }
        
        const response = await api.get(url);
        
        setBlogs(response.data.posts);
        setPage(response.data.page);
        setTotalPages(response.data.pages);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        // This would normally fetch categories from an API endpoint
        // For now we'll use some dummy categories
        setCategories([
          'Technology',
          'Innovation',
          'Business',
          'Development',
          'Design'
        ]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchBlogs();
    fetchCategories();
  }, [searchParams]);

  const handlePageChange = (newPage) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage);
    setSearchParams(newSearchParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, you would add search functionality here
    // For now, we'll just log the search term
    console.log('Searching for:', searchTerm);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <Hero
        title="Our Blog"
        subtitle="Insights, technology trends, and expert perspectives from our team"
        image="/images/blog-hero.jpg"
        primaryBtn={{ text: 'Latest Posts', url: '#blog-posts' }}
        fullHeight={false}
      />

      <section id="blog-posts" className="blog-list-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Row>
              <Col lg={8}>
                <motion.h2 
                  className="section-title mb-4"
                  variants={itemVariants}
                >
                  Latest Articles
                </motion.h2>

                {loading ? (
                  <div className="text-center py-5">
                    <p>Loading blog posts...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-5 text-danger">
                    <p>{error}</p>
                  </div>
                ) : blogs.length === 0 ? (
                  <div className="text-center py-5">
                    <p>No blog posts found.</p>
                  </div>
                ) : (
                  <Row className="g-4">
                    {blogs.map((post, index) => (
                      <Col key={post._id} md={6}>
                        <BlogCard post={post} index={index} />
                      </Col>
                    ))}
                  </Row>
                )}

                {totalPages > 1 && (
                  <div className="pagination-wrapper mt-5">
                    <Pagination className="justify-content-center">
                      <Pagination.Prev
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                      />
                      
                      {[...Array(totalPages).keys()].map((x) => (
                        <Pagination.Item
                          key={x + 1}
                          active={x + 1 === page}
                          onClick={() => handlePageChange(x + 1)}
                        >
                          {x + 1}
                        </Pagination.Item>
                      ))}
                      
                      <Pagination.Next
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                      />
                    </Pagination>
                  </div>
                )}
              </Col>

              <Col lg={4}>
                <div className="blog-sidebar">
                  <motion.div 
                    className="blog-search mb-4"
                    variants={itemVariants}
                  >
                    <h4 className="sidebar-title mb-3">Search</h4>
                    <Form onSubmit={handleSearch}>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          placeholder="Search posts..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button type="submit" variant="primary">
                          <FaSearch />
                        </Button>
                      </div>
                    </Form>
                  </motion.div>

                  <motion.div 
                    className="blog-categories mb-4"
                    variants={itemVariants}
                  >
                    <h4 className="sidebar-title mb-3">Categories</h4>
                    <ul className="category-list">
                      <li>
                        <Link 
                          to="/blog"
                          className={!searchParams.get('category') ? 'active' : ''}
                        >
                          All Categories
                        </Link>
                      </li>
                      {categories.map((category, index) => (
                        <li key={index}>
                          <Link 
                            to={`/blog?category=${category}`}
                            className={searchParams.get('category') === category ? 'active' : ''}
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div 
                    className="blog-recent mb-4"
                    variants={itemVariants}
                  >
                    <h4 className="sidebar-title mb-3">Recent Posts</h4>
                    <div className="recent-posts">
                      {/* Display a few recent posts here */}
                      <p className="text-muted">Recent posts will appear here.</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="blog-tags"
                    variants={itemVariants}
                  >
                    <h4 className="sidebar-title mb-3">Popular Tags</h4>
                    <div className="tag-cloud">
                      <Link to="/blog?tag=technology" className="tag-item">Technology</Link>
                      <Link to="/blog?tag=innovation" className="tag-item">Innovation</Link>
                      <Link to="/blog?tag=design" className="tag-item">Design</Link>
                      <Link to="/blog?tag=development" className="tag-item">Development</Link>
                      <Link to="/blog?tag=business" className="tag-item">Business</Link>
                      <Link to="/blog?tag=ai" className="tag-item">AI</Link>
                      <Link to="/blog?tag=web" className="tag-item">Web</Link>
                      <Link to="/blog?tag=mobile" className="tag-item">Mobile</Link>
                    </div>
                  </motion.div>
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default BlogPage;
