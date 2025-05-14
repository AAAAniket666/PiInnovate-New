import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../../app/api';
import '../../assets/css/contact.css';

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '',
    show: false
  });

  // Validation schema
  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        /^[0-9+\-() ]*$/,
        'Phone number can only contain digits and +, -, (, ), and spaces'
      ),
    subject: Yup.string()
      .required('Subject is required')
      .min(5, 'Subject must be at least 5 characters'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters')
  });

  // Animation variants
  const formVariants = {
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

  // Handle form submission
  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await api.post('/contact', values);
      
      setFormStatus({
        message: response.data.message,
        type: 'success',
        show: true
      });
      
      resetForm();
      
      // Hide the success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, show: false }));
      }, 5000);
    } catch (error) {
      setFormStatus({
        message: error.response?.data?.message || 'Failed to send message. Please try again.',
        type: 'danger',
        show: true
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={formVariants}
      className="contact-form-wrapper"
    >
      <h3 className="contact-form-title mb-4">Send Us a Message</h3>

      {formStatus.show && (
        <Alert 
          variant={formStatus.type}
          onClose={() => setFormStatus(prev => ({ ...prev, show: false }))}
          dismissible
        >
          {formStatus.message}
        </Alert>
      )}

      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }}
        validationSchema={contactSchema}
        onSubmit={handleSubmit}
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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name*</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </motion.div>
              </Col>
              
              <Col md={6}>
                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address*</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </motion.div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      placeholder="Enter your phone number (optional)"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.phone && errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </motion.div>
              </Col>
              
              <Col md={6}>
                <motion.div variants={itemVariants}>
                  <Form.Group className="mb-3">
                    <Form.Label>Subject*</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Enter message subject"
                      value={values.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.subject && errors.subject}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>
                </motion.div>
              </Col>
            </Row>

            <motion.div variants={itemVariants}>
              <Form.Group className="mb-4">
                <Form.Label>Message*</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={5}
                  placeholder="Enter your message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.message && errors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                variant="primary"
                className="btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <FaPaperPlane className="ms-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default ContactForm;
