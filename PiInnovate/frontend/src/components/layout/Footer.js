import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../app/api';
import { toast } from 'react-toastify';
import '../../assets/css/footer.css';

const Footer = () => {
  // Newsletter subscription schema
  const newsletterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  // Handle newsletter subscription
  const handleSubscribe = async (values, { resetForm }) => {
    try {
      const response = await api.post('/newsletter', values);
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to subscribe. Please try again.'
      );
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-top py-5">
        <Container>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="footer-widget">
                <div className="footer-logo mb-4">
                  <Link to="/">
                    <img 
                      src="/images/favicon.ico.png" 
                      alt="PI Innovate" 
                      width="50" 
                      height="50" 
                      className="me-2" 
                    />
                    <span className="footer-brand">PI Innovate</span>
                  </Link>
                </div>
                <p className="mb-4">
                  Providing innovative solutions and digital transformation 
                  services to businesses looking to stay ahead in today's 
                  competitive landscape.
                </p>
                <div className="footer-social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={2} md={6}>
              <div className="footer-widget">
                <h4 className="widget-title">Quick Links</h4>
                <ul className="footer-links">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/team">Our Team</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="footer-widget">
                <h4 className="widget-title">Contact Info</h4>
                <ul className="footer-contact">
                  <li>
                    <FaMapMarkerAlt className="contact-icon" />
                    <span>9 Plot No. 21, Midc, Rajiv Gandhi Infotech Park, Hinjewadi, Pune, Maharashtra, 411057</span>
                  </li>
                  <li>
                    <FaPhoneAlt className="contact-icon" />
                    <a href="tel:+919326196831">+91-9326196831</a>
                  </li>
                  <li>
                    <FaEnvelope className="contact-icon" />
                    <a href="mailto:info@piinnovate.com">info@piinnovate.com</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <div className="footer-widget">
                <h4 className="widget-title">Newsletter</h4>
                <p>Subscribe to our newsletter for the latest updates and offers.</p>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={newsletterSchema}
                  onSubmit={handleSubscribe}
                >
                  {({ 
                    values, 
                    errors, 
                    touched, 
                    handleChange, 
                    handleBlur, 
                    handleSubmit, 
                    isSubmitting 
                  }) => (
                    <Form onSubmit={handleSubmit} className="newsletter-form">
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Your email address"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="btn-block"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="footer-bottom py-3">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="mb-md-0">
                &copy; {new Date().getFullYear()} PI Innovate. All Rights Reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="mb-0">
                <Link to="/privacy-policy">Privacy Policy</Link> | 
                <Link to="/terms-of-service"> Terms of Service</Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
