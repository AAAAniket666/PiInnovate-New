import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLightbulb, FaRocket, FaChartLine, FaUsers } from 'react-icons/fa';
import Hero from '../ui/Hero';
import ServiceCard from '../services/ServiceCard';
import TestimonialCard from './TestimonialCard';
import BlogCard from '../blog/BlogCard';
import api from '../../app/api';
import '../../assets/css/home.css';

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [servicesRes, testimonialsRes, blogRes] = await Promise.all([
          api.get('/services/featured'),
          api.get('/testimonials/featured'),
          api.get('/blog/featured')
        ]);

        setServices(servicesRes.data);
        setTestimonials(testimonialsRes.data);
        setBlogPosts(blogRes.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Animation variants
  const sectionVariants = {
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

  return (
    <>
      <Hero
        title="Innovative Solutions for Digital Transformation"
        subtitle="We help businesses innovate, automate, and scale with cutting-edge technology solutions."
        image="/images/hero/hero-bg.jpg"
        primaryBtn={{ text: 'Our Services', url: '/services' }}
        secondaryBtn={{ text: 'Contact Us', url: '/contact' }}
        fullHeight={true}
        align="left"
      />

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title" 
              variants={itemVariants}
            >
              Why Choose PI Innovate?
            </motion.h2>
            <motion.p 
              className="section-subtitle" 
              variants={itemVariants}
            >
              We deliver excellence through our core principles
            </motion.p>
          </motion.div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <motion.div 
                className="feature-item text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="feature-icon">
                  <FaLightbulb />
                </div>
                <h3 className="feature-title">Innovative Thinking</h3>
                <p className="feature-text">
                  We approach each challenge with innovative solutions that set industry standards.
                </p>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div 
                className="feature-item text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="feature-icon">
                  <FaRocket />
                </div>
                <h3 className="feature-title">Fast Delivery</h3>
                <p className="feature-text">
                  Our agile methodology ensures rapid development without compromising quality.
                </p>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div 
                className="feature-item text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="feature-icon">
                  <FaChartLine />
                </div>
                <h3 className="feature-title">Result Oriented</h3>
                <p className="feature-text">
                  We focus on delivering measurable results that drive business growth.
                </p>
              </motion.div>
            </Col>

            <Col md={6} lg={3}>
              <motion.div 
                className="feature-item text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="feature-icon">
                  <FaUsers />
                </div>
                <h3 className="feature-title">Expert Team</h3>
                <p className="feature-text">
                  Our team consists of industry experts with years of experience in their fields.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section py-5 bg-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title" 
              variants={itemVariants}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="section-subtitle" 
              variants={itemVariants}
            >
              Explore our comprehensive range of technology solutions
            </motion.p>
          </motion.div>

          <Row className="g-4">
            {loading ? (
              <div className="text-center py-5">Loading services...</div>
            ) : services.length === 0 ? (
              <div className="text-center py-5">No services found</div>
            ) : (
              services.map((service, index) => (
                <Col key={service._id} md={6} lg={4}>
                  <ServiceCard service={service} index={index} />
                </Col>
              ))
            )}
          </Row>

          <div className="text-center mt-5">
            <Button as={Link} to="/services" variant="outline-primary" size="lg">
              View All Services
            </Button>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title" 
              variants={itemVariants}
            >
              What Clients Say
            </motion.h2>
            <motion.p 
              className="section-subtitle" 
              variants={itemVariants}
            >
              Trusted by businesses around the world
            </motion.p>
          </motion.div>

          <Row className="g-4">
            {loading ? (
              <div className="text-center py-5">Loading testimonials...</div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-5">No testimonials found</div>
            ) : (
              testimonials.map((testimonial, index) => (
                <Col key={testimonial._id} md={6} lg={4}>
                  <TestimonialCard testimonial={testimonial} index={index} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>

      {/* Blog Section */}
      <section className="blog-section py-5 bg-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title" 
              variants={itemVariants}
            >
              Latest From Our Blog
            </motion.h2>
            <motion.p 
              className="section-subtitle" 
              variants={itemVariants}
            >
              Industry insights and technology trends
            </motion.p>
          </motion.div>

          <Row className="g-4">
            {loading ? (
              <div className="text-center py-5">Loading blog posts...</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-5">No blog posts found</div>
            ) : (
              blogPosts.map((post, index) => (
                <Col key={post._id} md={6} lg={4}>
                  <BlogCard post={post} index={index} />
                </Col>
              ))
            )}
          </Row>

          <div className="text-center mt-5">
            <Button as={Link} to="/blog" variant="outline-primary" size="lg">
              View All Posts
            </Button>
          </div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5">
        <Container>
          <motion.div
            className="cta-content text-center p-5 rounded"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
          >
            <motion.h2 
              className="cta-title mb-4" 
              variants={itemVariants}
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p 
              className="cta-text mb-4" 
              variants={itemVariants}
            >
              Let's discuss how our innovative solutions can help your business grow.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button 
                as={Link} 
                to="/contact" 
                variant="primary" 
                size="lg" 
                className="btn-lg px-4 py-2"
              >
                Get Started Today
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
