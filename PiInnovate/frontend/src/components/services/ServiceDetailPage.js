import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import Hero from '../ui/Hero';
import api from '../../app/api';
import '../../assets/css/services.css';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${slug}`);
        setService(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching service details:', err);
        if (err.response?.status === 404) {
          setError('Service not found.');
        } else {
          setError('Failed to load service details. Please try again later.');
        }
        setLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

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
        <p>Loading service details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <p className="text-danger">{error}</p>
        <Button as={Link} to="/services" variant="primary" className="mt-3">
          <FaArrowLeft className="me-2" /> Back to Services
        </Button>
      </Container>
    );
  }

  if (!service) {
    return (
      <Container className="py-5 text-center">
        <p>Service not found.</p>
        <Button as={Link} to="/services" variant="primary" className="mt-3">
          <FaArrowLeft className="me-2" /> Back to Services
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Hero
        title={service.title}
        subtitle={service.description}
        image={service.image || "/images/services-hero.jpg"}
        primaryBtn={{ text: 'Get a Quote', url: '/contact' }}
        fullHeight={false}
      />

      <section className="service-detail-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Row>
              <Col lg={8}>
                <motion.div variants={itemVariants}>
                  <div className="service-detail-content">
                    {service.details ? (
                      <div dangerouslySetInnerHTML={{ __html: service.details }} />
                    ) : (
                      <>
                        <p>
                          At PI Innovate, we provide comprehensive {service.title} solutions 
                          that empower businesses to achieve their goals. Our expert team 
                          works closely with you to understand your specific needs and deliver 
                          tailored solutions that drive growth and innovation.
                        </p>
                        <p>
                          With years of experience in the industry, we have developed a deep 
                          understanding of the challenges businesses face when implementing 
                          {service.title} solutions. Our approach is focused on delivering 
                          high-quality services that meet your specific requirements and exceed 
                          your expectations.
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div 
                  className="service-features"
                  variants={itemVariants}
                >
                  <h3 className="mb-4">Key Features</h3>
                  
                  <div className="service-feature-item">
                    <div className="service-feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-feature-content">
                      <h4>Customized Solutions</h4>
                      <p>
                        Tailored approaches designed specifically for your business needs and goals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="service-feature-item">
                    <div className="service-feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-feature-content">
                      <h4>Expert Team</h4>
                      <p>
                        Access to industry professionals with years of experience in {service.title}.
                      </p>
                    </div>
                  </div>
                  
                  <div className="service-feature-item">
                    <div className="service-feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-feature-content">
                      <h4>Ongoing Support</h4>
                      <p>
                        Continuous assistance and maintenance to ensure your solution remains effective.
                      </p>
                    </div>
                  </div>
                  
                  <div className="service-feature-item">
                    <div className="service-feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-feature-content">
                      <h4>Scalable Implementation</h4>
                      <p>
                        Solutions that grow with your business and adapt to changing requirements.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Col>
              
              <Col lg={4}>
                <motion.div 
                  className="service-sidebar bg-light p-4 rounded-lg shadow-sm"
                  variants={itemVariants}
                >
                  <h3 className="mb-4">Other Services</h3>
                  
                  <ul className="list-unstyled">
                    <li className="mb-3">
                      <Link to="/services" className="d-flex align-items-center">
                        <span className="me-2">•</span>
                        <span>View All Services</span>
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link to="/contact" className="btn btn-primary w-100">
                        Request a Consultation
                      </Link>
                    </li>
                  </ul>
                  
                  <div className="mt-4 pt-4 border-top">
                    <h4 className="mb-3">Have Questions?</h4>
                    <p>
                      Contact our team for more information about our {service.title} 
                      services and how we can help your business.
                    </p>
                    <Link to="/contact" className="btn btn-outline-primary w-100">
                      Contact Us
                    </Link>
                  </div>
                </motion.div>
              </Col>
            </Row>
            
            <div className="text-center mt-5">
              <Button 
                as={Link} 
                to="/services" 
                variant="outline-primary"
                className="me-3"
              >
                <FaArrowLeft className="me-2" /> Back to Services
              </Button>
              <Button 
                as={Link} 
                to="/contact" 
                variant="primary"
              >
                Get Started
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ServiceDetailPage;
