import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../assets/css/header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  // Animation variants
  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`site-header ${scrolled ? 'scrolled' : ''}`}
    >
      <Navbar 
        expand="lg" 
        expanded={expanded}
        className={scrolled ? 'navbar-light bg-white shadow-sm' : 'navbar-dark'}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img 
              src="/images/logo.png" 
              alt="PI Innovate" 
              className="navbar-logo mr-2" 
              width="40"
              height="40"
            />
            <span className="brand-text">PI Innovate</span>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={() => setExpanded(!expanded)}
            className="border-0"
          >
            <FaBars />
          </Navbar.Toggle>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/services" 
                className={location.pathname.startsWith("/services") ? "active" : ""}
              >
                Services
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/team" 
                className={location.pathname.startsWith("/team") ? "active" : ""}
              >
                Our Team
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/blog" 
                className={location.pathname.startsWith("/blog") ? "active" : ""}
              >
                Blog
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className={location.pathname === "/contact" ? "active" : ""}
              >
                Contact
              </Nav.Link>
            </Nav>
            <div className="ms-lg-3 mt-3 mt-lg-0">
              <Button 
                as={Link} 
                to="/contact" 
                variant="primary" 
                className="btn-rounded"
              >
                Get a Quote
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.header>
  );
};

export default Header;
