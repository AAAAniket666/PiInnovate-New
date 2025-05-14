import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../assets/css/hero.css';

const Hero = ({ 
  title, 
  subtitle, 
  image, 
  primaryBtn, 
  secondaryBtn,
  overlay = true,
  fullHeight = false,
  align = 'left',
  imageRight = true,
  wave = true
}) => {
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

  return (
    <section className={`hero-section ${fullHeight ? 'hero-fullheight' : ''} ${overlay ? 'hero-overlay' : ''}`}>
      {image && (
        <div 
          className="hero-bg"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* For debugging - remove in production */}
          <img 
            src={image} 
            alt="Debug" 
            style={{
              width: '1px', 
              height: '1px', 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              opacity: 0
            }}
            onError={(e) => {
              console.error('Image failed to load:', image);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <Container className="position-relative">
        <Row className={`align-items-center ${imageRight ? '' : 'flex-row-reverse'}`}>
          <Col lg={6} md={12}>
            <motion.div 
              className={`hero-content text-${align} text-lg-${align}`}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {title && (
                <motion.h1 
                  className="hero-title"
                  variants={itemVariants}
                >
                  {title}
                </motion.h1>
              )}
              
              {subtitle && (
                <motion.p 
                  className="hero-subtitle"
                  variants={itemVariants}
                >
                  {subtitle}
                </motion.p>
              )}
              
              {(primaryBtn || secondaryBtn) && (
                <motion.div 
                  className="hero-buttons mt-4"
                  variants={itemVariants}
                >
                  {primaryBtn && (
                    <Button 
                      as={Link} 
                      to={primaryBtn.url} 
                      variant="primary" 
                      className="btn-lg me-3 mb-3 mb-md-0"
                    >
                      {primaryBtn.text}
                    </Button>
                  )}
                  
                  {secondaryBtn && (
                    <Button 
                      as={Link} 
                      to={secondaryBtn.url} 
                      variant="outline-light"
                      className="btn-lg"
                    >
                      {secondaryBtn.text}
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </Col>
          <Col lg={6} md={12} className="d-md-none d-lg-block">
            {/* Optional space for hero image or other content */}
          </Col>
        </Row>
      </Container>
      
      {wave && (
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      )}
    </section>
  );
};

export default Hero;
