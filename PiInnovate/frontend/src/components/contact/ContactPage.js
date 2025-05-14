import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Hero from '../ui/Hero';
import ContactForm from './ContactForm';
import '../../assets/css/contact.css';

const ContactPage = () => {
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
    <>
      <Hero
        title="Contact Us"
        subtitle="Get in touch with our team and let us know how we can help your business"
        image="/images/contact-hero.jpg"
        overlay={true}
        fullHeight={false}
      />

      <section className="contact-section py-5">
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Row className="g-4">
              <Col lg={7}>
                <motion.div variants={itemVariants}>
                  <ContactForm />
                </motion.div>
              </Col>

              <Col lg={5}>
                <motion.div 
                  className="contact-info-wrapper"
                  variants={itemVariants}
                >
                  <h3 className="contact-info-title">Contact Information</h3>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="contact-info-content">
                      <h5>Our Location</h5>
                      <p>9 Plot No. 21, Midc, Rajiv Gandhi Infotech Park, Hinjewadi, Pune, Maharashtra, 411057</p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FaPhoneAlt />
                    </div>
                    <div className="contact-info-content">
                      <h5>Phone Number</h5>
                      <p>
                        <a href="tel:+919326196831">+91-9326196831</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FaEnvelope />
                    </div>
                    <div className="contact-info-content">
                      <h5>Email Address</h5>
                      <p>
                        <a href="mailto:info@piinnovate.com">info@piinnovate.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FaClock />
                    </div>
                    <div className="contact-info-content">
                      <h5>Working Hours</h5>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="contact-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebookF />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <FaTwitter />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <FaInstagram />
                    </a>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      <section className="contact-map-section">
        <Container fluid className="p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="contact-map"
          >
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.7210704211984!2d73.7346187!3d18.5912236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c294f97%3A0x96106bded0e75d92!2sRajiv%20Gandhi%20Infotech%20Park%2C%20Hinjewadi%2C%20Pune%2C%20Maharashtra%20411057!5e0!3m2!1sen!2sin!4v1621336485276!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default ContactPage;
