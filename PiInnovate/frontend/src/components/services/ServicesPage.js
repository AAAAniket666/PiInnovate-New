import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Hero from '../ui/Hero';
import ServiceCard from './ServiceCard';
import api from '../../app/api';
import '../../assets/css/services.css';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        console.error('Error details:', {
          message: err.message,
          response: err.response,
          status: err.response?.status,
          data: err.response?.data
        });
        setError(`Failed to load services: ${err.message}`);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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
        title="Our Services"
        subtitle="Discover how we can help transform your business with innovative technology solutions"
        image="/images/hero/hero-1.jpg"
        primaryBtn={{ text: 'Get a Quote', url: '/contact' }}
        fullHeight={false}
      />

      <section className="services-list-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={itemVariants}
            >
              Comprehensive solutions tailored to your business needs
            </motion.p>
          </motion.div>

          {loading ? (
            <div className="text-center py-5">
              <p>Loading services...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5 text-danger">
              <p>{error}</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-5">
              <p>No services found.</p>
            </div>
          ) : (
            <Row className="g-4">
              {services.map((service, index) => (
                <Col key={service._id} md={6} lg={4}>
                  <ServiceCard service={service} index={index} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      <section className="services-process-section py-5 bg-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-5"
          >
            <motion.h2 
              className="section-title"
              variants={itemVariants}
            >
              Our Process
            </motion.h2>
            <motion.p
              className="section-subtitle"
              variants={itemVariants}
            >
              How we deliver exceptional results for every project
            </motion.p>
          </motion.div>

          <Row className="process-steps">
            <Col md={3}>
              <motion.div 
                className="process-step text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="process-step-number">1</div>
                <h3 className="process-step-title">Discovery</h3>
                <p className="process-step-description">
                  We take time to understand your business needs, goals, and challenges.
                </p>
              </motion.div>
            </Col>
            
            <Col md={3}>
              <motion.div 
                className="process-step text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="process-step-number">2</div>
                <h3 className="process-step-title">Planning</h3>
                <p className="process-step-description">
                  We create a detailed roadmap and strategy customized to your specific requirements.
                </p>
              </motion.div>
            </Col>
            
            <Col md={3}>
              <motion.div 
                className="process-step text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="process-step-number">3</div>
                <h3 className="process-step-title">Implementation</h3>
                <p className="process-step-description">
                  Our expert team brings your project to life using the latest technologies.
                </p>
              </motion.div>
            </Col>
            
            <Col md={3}>
              <motion.div 
                className="process-step text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
              >
                <div className="process-step-number">4</div>
                <h3 className="process-step-title">Support</h3>
                <p className="process-step-description">
                  We provide ongoing maintenance and support to ensure long-term success.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServicesPage;
